import * as PIXI from 'pixi.js'
import { config } from '../config'
import SlotMachine from './slot-machine'

class Scoreboard {
  public container: PIXI.Container = new PIXI.Container()
  private readonly _balance: number
  private readonly _bet: number
  private _balanceText: PIXI.Text | undefined
  private _betText: PIXI.Text | undefined

  public constructor(app: PIXI.Application, slotMachine: SlotMachine) {
    this._balance = slotMachine.balance
    this._bet = slotMachine.bet

    this._initializeSprite(app.screen.width, app.screen.height)
  }

  private _initializeSprite(appWidth: number, appHeight: number): void {
    const style = new PIXI.TextStyle({
      fontFamily: config.text.fontFamily,
      fill: config.text.color,
      fontSize: config.text.fontSize,
    })


    this._balanceText = new PIXI.Text(`Balance: ${this._balance}$`, style)
    const yPosition = appHeight - config.crank.bcgHeight / 2 - this._balanceText.height
    this._balanceText.y = yPosition + this._balanceText.height / 2
    this._balanceText.x = appWidth / 4 - this._balanceText.width / 2

    this._betText = new PIXI.Text(`Bet: ${this._bet}$`, style)
    this._betText.y = yPosition + this._betText.height / 2
    this._betText.x = appWidth * 0.75 - this._betText.width / 2

    const balanceBcg = new PIXI.Graphics()
    balanceBcg.beginFill(config.text.bcg)
    const balanceBcgHeight = this._balanceText.height * 2
    balanceBcg.drawRoundedRect(appWidth / 4 - config.text.bcgWidth / 2, yPosition, config.text.bcgWidth, balanceBcgHeight, 10)
    balanceBcg.endFill()
    balanceBcg.addChild(this._balanceText)

    const betBcg = new PIXI.Graphics()
    betBcg.beginFill(config.text.bcg)
    const betBcgHeight = this._betText.height * 2
    betBcg.drawRoundedRect(appWidth * 0.75 - config.text.bcgWidth / 2, yPosition, config.text.bcgWidth, betBcgHeight, 10)
    betBcg.endFill()
    betBcg.addChild(this._betText)


    this.container.addChild(balanceBcg, betBcg)
  }

  public incBalance(): void {

  }

  public decBalance(): void {

  }
}

export default Scoreboard