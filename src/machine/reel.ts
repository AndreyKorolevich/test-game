import * as PIXI from 'pixi.js'

class Reel {
  public readonly container = new PIXI.Container()
  public readonly cells: Array<PIXI.Texture>
  private _ticker: PIXI.Ticker
  public position: number
  public sprites: Array<PIXI.Sprite> = []
  public blur = new PIXI.filters.BlurFilter()
  private readonly _width: number
  // define how much visible elements on the reel
  private readonly _countRows: number
  private _config: { [key: string]: any }
  // define how much exchanges will be in the reel on every spin
  private readonly _target: number

  public constructor(
    app: PIXI.Application,
    position: number,
    config: { [key: string]: any },
  ) {
    this._ticker = app.ticker
    this.position = position

    this.cells = [
      app.loader.resources.asset.textures!['plum.png'],
      app.loader.resources.asset.textures!['grapes.png'],
      app.loader.resources.asset.textures!['bell.png'],
      app.loader.resources.asset.textures!['apple.png'],
      app.loader.resources.asset.textures!['coin.png'],
      app.loader.resources.asset.textures!['shoe.png'],
      app.loader.resources.asset.textures!['diamond.png'],
      app.loader.resources.asset.textures!['peach.png'],
    ]
    this._config = config

    this._width = config.reel.width
    this._countRows = config.reel.countRows
    this._target = config.reel.target

    this._initializeReel(position)
  }

  private _initializeReel(position: number): void {
    this.blur.blurX = 0
    this.blur.blurY = 0
    this.container.x = position * this._width * this._config.reel.scale.x
    this.container.filters = [this.blur]

    for (let i = 0; i < this._countRows + 1; i++) {
      const cell = new PIXI.Sprite(this.cells[Math.floor(Math.random() * this.cells.length)])
      cell.y = i * this._config.cell.width
      this.sprites.push(cell)
      this.container.addChild(cell)
    }
  }

  // works on every tick of PIXI.ticker
  public spin(stage: number): void {
    this.position = this._target * this._fluctuation(stage)

    // Update positions of elements in reel
    for (let i = 0; i < this.sprites.length; i++) {
      const sprite = this.sprites[i]
      const prev = sprite.y
      sprite.y = ((this.position + i) % this.sprites.length) * this._config.cell.width - this._config.cell.width

      if (sprite.y < 0 && prev > sprite.width) {
        // Detect when element is going over and exchange a texture

        // first 3 "if" use for test purposes with devTools
        if (this._shouldSetTexture(this._config.dev.top, 1, this._target)) {
          sprite.texture = this.cells[this._config.dev.top]
        } else if (this._shouldSetTexture(this._config.dev.center, 2, this._target)) {
          sprite.texture = this.cells[this._config.dev.center]
        } else if (this._shouldSetTexture(this._config.dev.bottom, 3, this._target)) {
          sprite.texture = this.cells[this._config.dev.bottom]
        } else {
          // regular swap texture
          sprite.texture = this.cells[Math.floor(Math.random() * this.cells.length)]
        }
      }
    }
  }

  // check if there is some dev tools settings
  private _shouldSetTexture(settingsValue: number | undefined, offset: number, targetPosition: number): boolean {
    return (
      settingsValue !== undefined &&
      settingsValue < this.cells.length &&
      targetPosition === Math.floor(this.position) + offset
    )
  }

  // add effect of when reel spin a little more than it need and then return to correct position
  private _fluctuation(amount: number) {
    return (--amount * amount * (1.5 * amount + 0.5) + 1)
  }

}

export default Reel