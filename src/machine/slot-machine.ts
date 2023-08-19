import * as PIXI from 'pixi.js'
import { config } from '../config'
import Reel from './reel'
import {
  HasBalanceState,
  HasBetState, LostState,
  NoBalanceState,
  SLOT_MACHINE_STATE,
  SpinReelsState,
  MachineState,
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
    this._currentState = this._states[SLOT_MACHINE_STATE.NO_BALANCE]
    for (let i = 0; i < this._countReels; i++) {
      const reel = new Reel(app, i)
      this._reels.push(reel)
      this.container.addChild(reel.container)
    }
    this._crank = new Crank(app, this.turnCrank.bind(this))
    this._scoreboard = new Scoreboard(app, this)

    this.container.addChild(this._crank.container, this._scoreboard.container)
  }

  public setState(state: SLOT_MACHINE_STATE): void {
    this._currentState = this._states[state]
  }

  public spin(): void {

  }

  private _winChecker(): boolean {
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

  public turnCrank(): void {
  this._crank.onDisable()
  }

  public addBalanceAfterWin(): void {

  }
}

export default SlotMachine