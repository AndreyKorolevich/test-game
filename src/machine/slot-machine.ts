import * as PIXI from 'pixi.js'
import { config } from '../config'
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
  private _balance: number = 0
  private _bet: number = 0
  private _countReels: number = config.slotMachine.countReels
  private _maxCountReels: number = config.slotMachine.maxCountReels
  private _minCountReels: number = config.slotMachine.minCountReels
  private _winScreen: WinScreen
  private _lostScreen: LostScreen
  private readonly _states: {
    [key in SLOT_MACHINE_STATE]: MachineState
  }
  private _currentState: MachineState

  public constructor(app: PIXI.Application) {
    this._states = {
      [SLOT_MACHINE_STATE.NO_BALANCE]: new NoBalanceState(this),
      [SLOT_MACHINE_STATE.HAS_BALANCE]: new HasBalanceState(this),
      [SLOT_MACHINE_STATE.HAS_BET]: new HasBetState(this),
      [SLOT_MACHINE_STATE.SPIN_REELS]: new SpinReelsState(this),
      [SLOT_MACHINE_STATE.WIN]: new WinState(this),
      [SLOT_MACHINE_STATE.LOST]: new LostState(this),
    }
    this._currentState = this._states[SLOT_MACHINE_STATE.NO_BALANCE]

    this.crank = new Crank(app, this.turnCrank.bind(this))
    this._scoreboard = new Scoreboard(app, this)
    this._lostScreen = new LostScreen(app, this.hideScreen.bind(this))
    this._winScreen = new WinScreen(app, this.hideScreen.bind(this))

    this._initializeSlotMachine(app)
  }

  private _initializeSlotMachine(app: PIXI.Application): void {
    const reelsContainer = new PIXI.Container()

    //set up offset of the reels
    reelsContainer.x = config.sideColumn.width + config.reel.additionalRightOffset
    reelsContainer.width = config.reel.width * config.slotMachine.countReels
    reelsContainer.height = config.reel.height

    // Create a mask shape
    const maskShape = new PIXI.Graphics()
    maskShape.beginFill(0xFF3300)
    maskShape.drawRect(reelsContainer.x, 0, config.reel.width * config.slotMachine.countReels, config.reel.height)
    maskShape.endFill()

    // Apply the mask to the reelsContainer
    reelsContainer.mask = maskShape

    for (let i = 0; i < this._countReels; i++) {
      const reel = new Reel(app, i)
      this.reels.push(reel)
      reelsContainer.addChild(reel.container)
    }

    this.container.addChild(reelsContainer, this.crank.container, this._scoreboard.container)

    // add screens by the last to show them on top of other content
    this.container.addChild(this._lostScreen.container)
    this.container.addChild(this._winScreen.container)

    // @ts-ignore
    window.state = this._currentState
  }

  public setState(state: SLOT_MACHINE_STATE): void {
    this._currentState = this._states[state]
    // @ts-ignore
    window.state = this._currentState
  }

  public spin(): void {
    this._currentState.spin()
  }

  public async* spinLoop(remainingReels: Array<Reel>) {
    while (true) {
      const spinningReels = remainingReels.map(reel => reel.spin())
      await Promise.all(spinningReels)
      this._exchangeTexture()
      yield
    }
  }

  private _exchangeTexture() {
    this.reels.forEach(reel => {
      reel.sprites[0].texture = reel.cells[Math.floor(Math.random() * reel.cells.length)]
    })
  }

  public winChecker(reels: Array<Reel>): boolean {
    const combinations: Map<any, Set<any>> = new Map()

    for (let i = 0; i < config.reel.countRows; i++) {
      combinations.set(`comb${i}`, new Set())
    }

    reels.forEach(reel => {
      for (let i = 0; i < config.reel.countRows; i++) {
        const cell = reel.sprites[i]
        combinations.get(`comb${i}`)!.add(cell.texture.textureCacheIds[0].split('.')[0])
      }

    })

    for(const [combName, combSet] of combinations){
      if(combSet.size >= 1 ) return true
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

  public showScreen(): void {
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
    this._balance += config.slotMachine.balance
    this._scoreboard.setBalance(this._balance)
  }

  public decBalance(): void {
    this._balance = 0
    this._scoreboard.setBalance(this._balance)
  }

  public incBet(): void {
    if (this._balance - config.slotMachine.bet < 0) return

    this._bet += config.slotMachine.bet
    this._balance -= config.slotMachine.bet
    this._scoreboard.setBet(this._bet)
    this._scoreboard.setBalance(this._balance)
  }

  public decBet(): void {
    this._bet -= config.slotMachine.bet
    this._balance += config.slotMachine.bet
    this._scoreboard.setBet(this._bet)
    this._scoreboard.setBalance(this._balance)
  }

  public resetBet(): void {
    this._bet = 0
    this._scoreboard.setBet(this._bet)
  }

  public showWinScreen(): void {
    this._winScreen?.show()
  }

  public showLostScreen(): void {
    this._lostScreen?.show()
  }

  private _addReel(): void {

  }

  public addBalanceAfterWin(): void {
    this._balance += this._bet * 3
    this._scoreboard.setBalance(this._balance)
  }

  public setCountReels(): void {

  }
}

export default SlotMachine