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

class SlotMachine {
  public container: PIXI.Container = new PIXI.Container()
  private _reels: Array<Reel> = []
  private _crank: Crank
  private _scoreboard: Scoreboard
  public balance: number = config.slotMachine.balance
  public bet: number = config.slotMachine.bet
  private _countReels: number = config.slotMachine.countReels
  private _maxCountReels: number = config.slotMachine.maxCountReels
  private _minCountReels: number = config.slotMachine.minCountReels
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
    this._currentState = this._states[SLOT_MACHINE_STATE.HAS_BALANCE]

    this._crank = new Crank(app, this.turnCrank.bind(this))
    this._scoreboard = new Scoreboard(app, this)

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
      this._reels.push(reel)
      reelsContainer.addChild(reel.container)
    }

    this.container.addChild(reelsContainer, this._crank.container, this._scoreboard.container)
  }

  public setState(state: SLOT_MACHINE_STATE): void {
    this._currentState = this._states[state]
  }

  public async spin(): Promise<void> {
    if (this._currentState.state !== SLOT_MACHINE_STATE.HAS_BALANCE) return
    this.setState(SLOT_MACHINE_STATE.SPIN_REELS)

    const start = Date.now()
    const remainingReels = [...this._reels]

    for await (let value of this._spinLoop(remainingReels)) {
      const offset = config.slotMachine.startDelay + (this._reels.length - remainingReels.length + 1) * config.slotMachine.reelDelay

      if (Date.now() >= start + offset) {
        remainingReels[0].resetBlur()
        remainingReels.shift()
      }

      if (!remainingReels.length) break
    }

    this._reelsComplete(this._reels.map(reel => reel.sprites[2]))
  }

  private async* _spinLoop(remainingReels: Array<Reel>) {
    while (true) {
      const spinningReels = remainingReels.map(reel => reel.spin())
      await Promise.all(spinningReels)
      this._exchangeTexture()
      yield
    }
  }

  private _exchangeTexture() {
    this._reels.forEach(reel => {
      reel.sprites[0].texture = reel.cells[Math.floor(Math.random() * reel.cells.length)]
    })
  }

  private _reelsComplete(cells: Array<PIXI.Sprite>): void {
    if (this._winChecker(cells)) {
      this.setState(SLOT_MACHINE_STATE.WIN)
    } else {
      this.setState(SLOT_MACHINE_STATE.LOST)
    }
  }

  private _winChecker(cells: Array<PIXI.Sprite>): boolean {
    return false
  }

  public setCountReels(): void {

  }

  private _addReel(): void {

  }

  public addBalance(): void {

  }

  public resetBalance(): void {

  }

  public placeBet(): void {

  }

  public async turnCrank(): Promise<void> {
    this._crank.onDisable()
    await this.spin()
    this._crank.offDisable()

  }

  public addBalanceAfterWin(): void {

  }
}

export default SlotMachine