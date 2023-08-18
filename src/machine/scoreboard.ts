import * as PIXI from 'pixi.js'
import { config } from '../config'
import SlotMachine from './slot-machine'

class Scoreboard {
  public container: PIXI.Container = new PIXI.Container()
  private _balance: number
  private _bet: number
  private _balanceText: PIXI.Text | undefined
  private _betText: PIXI.Text | undefined

  public constructor(app: PIXI.Application, slotMachine: SlotMachine) {
    this._balance = slotMachine.balance
    this._bet = slotMachine.bet

    this._initializeSprite()
  }

  private _initializeSprite(): void {

  }

  public incBalance(): void {

  }

  public decBalance(): void {

  }
}

export default Scoreboard