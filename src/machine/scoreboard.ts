import * as PIXI from 'pixi.js'
import { config } from '../config'
import SlotMachine from './slot-machine'

class Scoreboard {
  public container: PIXI.Container = new PIXI.Container()
  private _balanceText: PIXI.Text | undefined
  private _addBalanceText: PIXI.Text | undefined
  private _cashedText: PIXI.Text | undefined
  private _betText: PIXI.Text | undefined
  private _placeBetText: PIXI.Text | undefined
  private _decreaseBetText: PIXI.Text | undefined
  private readonly _slotMachine: SlotMachine

  public constructor(app: PIXI.Application, slotMachine: SlotMachine) {
    this._slotMachine = slotMachine

    this._initializeSprite(app.screen.width, app.screen.height)
  }

  private _initializeSprite(appWidth: number, appHeight: number): void {
    const textStyle = config.text.textStyle as PIXI.TextStyle
    const style = new PIXI.TextStyle(textStyle)
    const actionStyle = new PIXI.TextStyle({ ...textStyle, ...config.text.actionTextStyle })
    const yPosition = appHeight - config.crank.bcgHeight / 2 - config.text.textStyle.fontSize

    const balanceBcg = this._initializeBalanceBoard(appWidth, style, actionStyle, yPosition)
    const betBcg = this._initializeBetBoard(appWidth, style, actionStyle, yPosition)

    this.container.addChild(balanceBcg, betBcg)
  }

  private _initializeBalanceBoard(appWidth: number, style: PIXI.TextStyle, actionStyle: PIXI.TextStyle, yPosition: number): PIXI.Graphics {
    this._balanceText = new PIXI.Text(`Balance: ${this._slotMachine.getBalance()}$`, style)

    this._balanceText.y = yPosition + this._balanceText.height / 2
    this._balanceText.x = appWidth / 4 - this._balanceText.width / 2

    this._addBalanceText = new PIXI.Text('Top up', new PIXI.TextStyle(actionStyle))
    this._addBalanceText.y = yPosition
    this._addBalanceText.x = appWidth / 4 - this._addBalanceText.width / 2

    this._addBalanceText.interactive = true
    this._addBalanceText.buttonMode = true
    this._addBalanceText.addListener('pointerdown', this._slotMachine.addBalance.bind(this._slotMachine))

    this._cashedText = new PIXI.Text('Cash out', new PIXI.TextStyle(actionStyle))
    this._cashedText.y = yPosition + this._cashedText.height * 2 + 10
    this._cashedText.x = appWidth / 4 - this._cashedText.width / 2

    this._cashedText.interactive = true
    this._cashedText.buttonMode = true
    this._cashedText.addListener('pointerdown', this._slotMachine.cashOutBalance.bind(this._slotMachine))

    const balanceBcg = new PIXI.Graphics()
    balanceBcg.beginFill(config.text.bcg)
    const balanceBcgHeight = this._balanceText.height * 2
    balanceBcg.drawRoundedRect(appWidth / 4 - config.text.bcgWidth / 2, yPosition, config.text.bcgWidth, balanceBcgHeight, 10)
    balanceBcg.endFill()
    balanceBcg.addChild(this._balanceText, this._addBalanceText, this._cashedText)

    return balanceBcg
  }

  private _initializeBetBoard(appWidth: number, style: PIXI.TextStyle, actionStyle: PIXI.TextStyle, yPosition: number): PIXI.Graphics {
    this._betText = new PIXI.Text(`Bet: ${this._slotMachine.getBet()}$`, style)
    this._betText.y = yPosition + this._betText.height / 2
    this._betText.x = appWidth * 0.75 - this._betText.width / 2

    this._placeBetText = new PIXI.Text('+', new PIXI.TextStyle(actionStyle))
    this._placeBetText.y = yPosition
    this._placeBetText.x = appWidth * 0.75 - this._placeBetText.width / 2

    this._placeBetText.interactive = true
    this._placeBetText.buttonMode = true
    this._placeBetText.addListener('pointerdown', this._slotMachine.placeBet.bind(this._slotMachine))

    this._decreaseBetText = new PIXI.Text('-', new PIXI.TextStyle(actionStyle))
    this._decreaseBetText.y = yPosition + this._decreaseBetText.height * 2 + 10
    this._decreaseBetText.x = appWidth * 0.75 - this._decreaseBetText.width / 2

    this._decreaseBetText.interactive = true
    this._decreaseBetText.buttonMode = true
    this._decreaseBetText.addListener('pointerdown', this._slotMachine.reduceBet.bind(this._slotMachine))

    const betBcg = new PIXI.Graphics()
    betBcg.beginFill(config.text.bcg)
    const betBcgHeight = this._betText.height * 2
    betBcg.drawRoundedRect(appWidth * 0.75 - config.text.bcgWidth / 2, yPosition, config.text.bcgWidth, betBcgHeight, 10)
    betBcg.endFill()
    betBcg.addChild(this._betText, this._placeBetText, this._decreaseBetText)

    return betBcg
  }

  public setBalance(balance: number): void {
    this._balanceText!.text = `Balance: ${balance}$`
  }

  public setBet(bet: number): void {
    this._betText!.text = `Bet: ${bet}$`
  }
}

export default Scoreboard