import * as PIXI from 'pixi.js'
import Reel from './reel'
import {
  MachineState,
  SLOT_MACHINE_STATE,
} from './slot-mashine-state/slot-mashine-state'
import Crank from './crank'
import Scoreboard from './scoreboard'
import WinScreen from '../screen/win-screen'
import LostScreen from '../screen/lost-screen'
import { NoBalanceState } from './slot-mashine-state/no-balance-state'
import { HasBalanceState } from './slot-mashine-state/has-balance-state'
import { HasBetState } from './slot-mashine-state/has-bet-state'
import { WinState } from './slot-mashine-state/win-state'
import { LostState } from './slot-mashine-state/lost-state'
import { SpinReelsState } from './slot-mashine-state/spin-reels-state'
import SpinDownStrategy from './reel-strategy/spin-down-strategy'
import SpinUpStrategy from './reel-strategy/spin-up-strategy'

export type AnimationT = {
  reel: Reel,
  delay: number,
  start: number,
}

class SlotMachine {
  public container: PIXI.Container = new PIXI.Container()
  public reels: Array<Reel> = []
  public crank: Crank
  private _scoreboard: Scoreboard
  private _balance: number
  private _bet: number
  private readonly _countReels: number
  private _winScreen: WinScreen
  private _lostScreen: LostScreen
  private readonly _states: {
    [key in SLOT_MACHINE_STATE]: MachineState
  }
  private _currentState: MachineState
  private _animations: Array<AnimationT> = []

  public readonly config: { [key: string]: any }

  public constructor(app: PIXI.Application, config: { [key: string]: any }) {
    this.config = config
    //initialize all possible Slot Machine states
    this._states = {
      [SLOT_MACHINE_STATE.NO_BALANCE]: new NoBalanceState(this),
      [SLOT_MACHINE_STATE.HAS_BALANCE]: new HasBalanceState(this),
      [SLOT_MACHINE_STATE.HAS_BET]: new HasBetState(this),
      [SLOT_MACHINE_STATE.SPIN_REELS]: new SpinReelsState(this),
      [SLOT_MACHINE_STATE.WIN]: new WinState(this),
      [SLOT_MACHINE_STATE.LOST]: new LostState(this),
    }
    //initial state HasBet to make use of this simulation easier, in real machine it will be noBalance,
    // then we will be ask add money in wallet and place bet
    this._currentState = this._states[SLOT_MACHINE_STATE.HAS_BET]
    this._countReels = config.slotMachine.countReels
    this._balance = config.slotMachine.balance
    this._bet = config.slotMachine.bet

    this.crank = new Crank(app, this.turnCrank.bind(this))
    this._scoreboard = new Scoreboard(app, this)
    this._lostScreen = new LostScreen(app, this.config, this._hideScreen.bind(this))
    this._winScreen = new WinScreen(app, this.config, this._hideScreen.bind(this))

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

    // create array of reels with certain movement strategy
    for (let i = 0; i < this._countReels; i++) {
      //strategy can be change in devTools, by default is SpinDownStrategy
      const strategy = this.config.dev.move ? new SpinUpStrategy() : new SpinDownStrategy()
      const reel = new Reel(app, strategy, i, this.config)
      this.reels.push(reel)
      reelsContainer.addChild(reel.container)
    }
    this.container.addChild(reelsContainer, this.crank.container, this._scoreboard.container)

    // add screens by the last to show them on top of other content
    this.container.addChild(this._lostScreen.container)
    this.container.addChild(this._winScreen.container)

    this._addTicker(app.ticker)
  }

  private _addTicker(ticker: PIXI.Ticker): void {
    // Listen for animate update.
    ticker.add(() => {
      const now = Date.now()
      let isReadyStopReel = false

      for (let i = 0; i < this._animations.length; i++) {
        const animation = this._animations[i]
        const stage = Math.min(1, (now - animation.start) / animation.delay)
        animation.reel.spin(stage, i)

        if (stage === 1) {
          // wait before the last reel is stopped
          if (i === this._animations.length - 1) {
            this._completeSpin()
          }
          isReadyStopReel = true
        }
      }
      //remove first element of "animated" array that allow stop them one by one
      if (isReadyStopReel) {
        this._animations.shift()
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

  // this method is triggered when the rotation animation is completed
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

  //check if there is a winning combination, a winning combination is when all the elements match in any row
  private _winChecker(): boolean {
    //predefine object with combinations
    const combinations: Map<string, Set<any>> = new Map()

    //initialize the number of combinations equal to the number of rows in the slot machine
    for (let i = 0; i < this.config.reel.countRows; i++) {
      combinations.set(`comb${i}`, new Set())
    }

    //go through all the reels and look at the array of sprites to take the texture and put it in the combination object
    this.reels.forEach(reel => {
      // walk through the array of sprites, take an element at a certain position and place it in the correct combination field
      // 0 index is out of screen, so start from 1. Take sprite in position "i" and put in combinations where save elements
      // from other sprites of reels in position "i"
      for (let i = 1; i < reel.sprites.length; i++) {
        const sprite = reel.sprites[i]
        //save a unique texture name in the Set
        combinations.get(`comb${i - 1}`)!.add(sprite.texture.textureCacheIds[0])
      }

    })

    //if there is a match, size of Set will be 1, because Set save only unique name of texture
    for (const [combName, combSet] of combinations) {
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

  private _hideScreen(): void {
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

  // add object in _animations array that use in ticker
  public packAnimation(animation: AnimationT): void {
    this._animations.push(animation)
  }

  // increase total balance after win
  private _addBalanceAfterWin(): void {
    this._balance += this._bet * 3
    this._scoreboard.setBalance(this._balance)
  }
}

export default SlotMachine