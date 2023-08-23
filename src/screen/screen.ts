import * as PIXI from 'pixi.js'

abstract class Screen {
  public container: PIXI.Container = new PIXI.Container()
  public graphics: PIXI.Graphics = new PIXI.Graphics()
  private readonly _onClickHandler: () => void
  public config: {[key: string]: any}

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

    this.container.addChild(this.graphics)
  }

  public show(): void {
    this.container.visible = true
    this.graphics.addListener('pointerdown', this.hide.bind(this))
  }

  public hide(): void {
    this._onClickHandler()
    this.container.visible = false
  }

}

export default Screen