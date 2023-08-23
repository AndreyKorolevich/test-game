import * as PIXI from 'pixi.js'

abstract class Screen {
  public container: PIXI.Container = new PIXI.Container()
  public graphics: PIXI.Graphics = new PIXI.Graphics()
  public button: PIXI.Graphics = new PIXI.Graphics()
  public text: PIXI.Text | undefined
  private readonly _onClickHandler: () => void
  public config: {[key: string]: any}
  public sound: HTMLAudioElement = new Audio()

  protected constructor(app: PIXI.Application, config: {[key: string]: any}, onClickHandler: () => void) {
    this.config = config
    this._onClickHandler = onClickHandler
    this._createBackground(app.screen.width)
    this.initializeScreen(app.screen.width, app.screen.height)
  }

  abstract initializeScreen(appWidth: number, appHeight: number): void

  private _createBackground(appWidth: number): void {
    this.container.visible = false

    this.graphics.beginFill(0xcddc39, 0.9)
    this.graphics.drawRect(0, 0, appWidth - this.config.sideColumn.width * 2, this.config.reel.countRows * this.config.cell.width)
    this.graphics.endFill()
    this.graphics.x = this.config.sideColumn.width
    this.graphics.interactive = true
    this.graphics.buttonMode = true

    this.button.beginFill(0x4caf50)
    this.button.drawRect(this.graphics.width / 2, this.graphics.height - 60, 100, 50)
    this.button.endFill()

    const style = new PIXI.TextStyle({...this.config.text.textStyle, fontSize: 20} as PIXI.TextStyle)

    this.text = new PIXI.Text('Close', style)
    this.text.x = this.graphics.width / 2 + this.text.width / 4
    this.text.y = this.graphics.height - 60 + this.text.height / 4

    this.container.addChild(this.graphics, this.button, this.text)
  }

  public show(): void {
    this.container.visible = true
    this.graphics.addListener('pointerdown', this.hide.bind(this))
    this.sound.play()
  }

  public hide(): void {
    this._onClickHandler()
    this.container.visible = false
  }

}

export default Screen