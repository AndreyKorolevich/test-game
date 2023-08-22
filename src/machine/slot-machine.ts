import * as PIXI from 'pixi.js'
import Reel from './reel'
import {
  HasBalanceState,
  HasBetState,
  LostState,
  MachineState,
  NoBalanceState,
  SLOT_MACHINE_STATE,
  SpinReelsState,
  WinState,
} from './slot-mashine-state/slot-mashine-state'
import Crank from './crank'
import Scoreboard from './scoreboard'
import WinScreen from '../screen/win-screen'
import LostScreen from '../screen/lost-screen'

class SlotMachine {
  public container: PIXI.Container = new PIXI.Container()
  public reels: Array<Reel> = []
  public crank: Crank
  private _scoreboard: Scoreboard
  private _balance: number = 100
  private _bet: number = 10
  private readonly _countReels: number
  private _winScreen: WinScreen
  private _lostScreen: LostScreen
  private readonly _states: {
    [key in SLOT_MACHINE_STATE]: MachineState
  }
  private _currentState: MachineState
  private _tweening: Array<{
    reel: Reel,
    startPosition: number,
    target: number,
    easing: (t: number) => number,
    time: number,
    start: number,
  }> = []

  public readonly config: { [key: string]: any }

  public constructor(app: PIXI.Application, config: { [key: string]: any }) {
    this.config = config
    this._states = {
      [SLOT_MACHINE_STATE.NO_BALANCE]: new NoBalanceState(this),
      [SLOT_MACHINE_STATE.HAS_BALANCE]: new HasBalanceState(this),
      [SLOT_MACHINE_STATE.HAS_BET]: new HasBetState(this),
      [SLOT_MACHINE_STATE.SPIN_REELS]: new SpinReelsState(this),
      [SLOT_MACHINE_STATE.WIN]: new WinState(this),
      [SLOT_MACHINE_STATE.LOST]: new LostState(this),
    }
    this._currentState = this._states[SLOT_MACHINE_STATE.HAS_BET]

    this.crank = new Crank(app, this.turnCrank.bind(this))
    this._scoreboard = new Scoreboard(app, this)
    this._lostScreen = new LostScreen(app, this.hideScreen.bind(this))
    this._winScreen = new WinScreen(app, this.hideScreen.bind(this))

    this._countReels = config.slotMachine.countReels


    this._initializeSlotMachine(app)
  }

  private _initializeSlotMachine(app: PIXI.Application): void {
    const reelsContainer = new PIXI.Container()

    //set up offset of the reels
    const containerWidth = this.config.reel.width * this.config.slotMachine.countReels * this.config.reel.scale.x
    const containerHeight = this.config.cell.width * this.config.reel.countRows
    reelsContainer.x = this.config.sideColumn.width + this.config.reel.additionalRightOffset
    reelsContainer.width = containerWidth
    reelsContainer.height = containerHeight

    // Create a mask shape
    const maskShape = new PIXI.Graphics()
    maskShape.beginFill(0xFF3300)
    maskShape.drawRect(reelsContainer.x, 0, containerWidth, containerHeight)
    maskShape.endFill()

    // Apply the mask to the reelsContainer
    reelsContainer.mask = maskShape

    for (let i = 0; i < this._countReels; i++) {
      const reel = new Reel(app, i, this.config, this.getTargets.bind(this))
      this.reels.push(reel)
      reelsContainer.addChild(reel.container)
    }

    this.container.addChild(reelsContainer, this.crank.container, this._scoreboard.container)

    // add screens by the last to show them on top of other content
    this.container.addChild(this._lostScreen.container)
    this.container.addChild(this._winScreen.container)

    this._addTicker(app.ticker)

    // @ts-ignore
    window.state = this._currentState
  }

  private _addTicker(ticker: PIXI.Ticker): void {
    // Listen for animate update.
    ticker.add((delta) => {
      const now = Date.now()
      const remove = []

      for (let i = 0; i < this._tweening.length; i++) {
        const t = this._tweening[i]
        const phase = Math.min(1, (now - t.start) / t.time)
        t.reel.spin(t.startPosition, t.target, t.easing(phase))

        if (phase === 1) {
          t.reel.position = t.target
          // wait before the last reel is stopped
          if (i === this._tweening.length - 1) {
            // add short delay to be shore that all other reels are stopped as well
            // setTimeout(() => {
            this._completeSpin()
            // }, 200)

          }
          remove.push(t)
        }
      }
      for (let i = 0; i < remove.length; i++) {
        this._tweening.splice(this._tweening.indexOf(remove[i]), 1)
      }
    })
  }

  public setState(state: SLOT_MACHINE_STATE): void {
    this._currentState = this._states[state]
    // @ts-ignore
    window.state = this._currentState
  }

  public spin(): void {
    this._currentState.spin()
  }

  private _completeSpin() {
    this.crank.offDisable()

    if (this._winChecker()) {
      this.setState(SLOT_MACHINE_STATE.WIN)
      this._addBalanceAfterWin()
    } else {
      this.setState(SLOT_MACHINE_STATE.LOST)
    }

    this._showScreen()
    this._resetBet()
  }

  private _winChecker(): boolean {
    const combinations: Map<string, Set<any>> = new Map()

    for (let i = 0; i < this.config.reel.countRows; i++) {
      combinations.set(`comb${i}`, new Set)
    }

    this.reels.forEach(reel => {
      for (let i = 0; i < this.config.reel.countRows; i++) {
        const sprite = reel.sprites[i]
        combinations.get(`comb${i}`)!.add(sprite.texture.textureCacheIds[0].split('.')[0])
      }

    })

    for (const [combName, combSet] of combinations) {
      console.log(combName, combSet)
      if (combSet.size === 1) return true
    }

    return false
  }

  // this method simulate add user money to the game wallet
  public addBalance(): void {
    this._currentState.addBalance()
  }

  //this method simulate cash out user money from the game wallet
  public cashOutBalance(): void {
    this._currentState.cashOutBalance()
  }

  public placeBet(): void {
    this._currentState.placeBet()
  }

  public reduceBet(): void {
    this._currentState.reduceBet()
  }

  public turnCrank(): void {
    this._currentState.turnCrank()
  }

  private _showScreen(): void {
    this._currentState.showScreen()
  }

  public hideScreen(): void {
    this._currentState.hideScreen()
  }

  public getBalance(): number {
    return this._balance
  }

  public getBet(): number {
    return this._bet
  }

  public incBalance(): void {
    this._balance += this.config.slotMachine.balance
    this._scoreboard.setBalance(this._balance)
  }

  public decBalance(): void {
    this._balance = 0
    this._scoreboard.setBalance(this._balance)
  }

  public incBet(): void {
    if (this._balance - this.config.slotMachine.bet < 0) return

    this._bet += this.config.slotMachine.bet
    this._balance -= this.config.slotMachine.bet
    this._scoreboard.setBet(this._bet)
    this._scoreboard.setBalance(this._balance)
  }

  public decBet(): void {
    this._bet -= this.config.slotMachine.bet
    this._balance += this.config.slotMachine.bet
    this._scoreboard.setBet(this._bet)
    this._scoreboard.setBalance(this._balance)
  }

  private _resetBet(): void {
    this._bet = 0
    this._scoreboard.setBet(this._bet)
  }

  public showWinScreen(): void {
    this._winScreen?.show()
  }

  public showLostScreen(): void {
    this._lostScreen?.show()
  }

  private _backout(amount: number) {
    return (t: number) => (--t * t * ((amount + 1) * t + amount) + 1)
  }

  public tweenTo(reel: Reel, target: number, time: number): void {
    const tween = {
      reel,
      startPosition: reel.position,
      target,
      easing: this._backout(0.5),
      time,
      start: Date.now(),
    }

    this._tweening.push(tween)
  }

  public getTargets(): Set<number> {
    return new Set(this._tweening.map(t => t.target))
  }

  private _addBalanceAfterWin(): void {
    this._balance += this._bet * 3
    this._scoreboard.setBalance(this._balance)
  }
}

export default SlotMachine