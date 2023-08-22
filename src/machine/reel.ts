import * as PIXI from 'pixi.js'
import { config } from '../config'

class Reel {
  public readonly container = new PIXI.Container()
  public readonly cells: Array<PIXI.Texture>
  private _ticker: PIXI.Ticker
  public position: number
  private _previousPosition: number = config.reel.previousPosition
  public sprites: Array<PIXI.Sprite> = []
  public blur = new PIXI.filters.BlurFilter()
  private _width: number = config.reel.width
  private _countRows: number = config.reel.countRows
  private readonly _getTargets: () => Set<number>
  private readonly _isSpinning: () => boolean
  private _settings: { [key: string]: number }

  public constructor(
    app: PIXI.Application,
    position: number,
    settings: { [key: string]: number },
    getTargets: () => Set<number>,
    isSpinning: () => boolean,
  ) {
    this._ticker = app.ticker
    this.position = position
    this._getTargets = getTargets
    this._isSpinning = isSpinning

    this.cells = [
      app.loader.resources.asset.textures!['cell1.png'],
      app.loader.resources.asset.textures!['cell2.png'],
      app.loader.resources.asset.textures!['cell3.png'],
      app.loader.resources.asset.textures!['cell4.png'],
      app.loader.resources.asset.textures!['cell5.png'],
      app.loader.resources.asset.textures!['cell6.png'],
      app.loader.resources.asset.textures!['cell7.png'],
      app.loader.resources.asset.textures!['cell8.png'],
    ]

    this._initializeReel(position)
    this._settings = settings
  }

  public spin(startPosition: number, target: number, easing: number): void {
    this.position = this._lerp(startPosition, target, easing)
    this.setBlur()
  }

  private _initializeReel(position: number): void {
    this.blur.blurX = 0
    this.blur.blurY = 0
    this.container.x = position * this._width * config.reel.scale.x
    this.container.filters = [this.blur]

    for (let i = 0; i < this._countRows + 1; i++) {
      const cell = new PIXI.Sprite(this.cells[Math.floor(Math.random() * this.cells.length)])
      cell.y = i * config.cell.width

      this.sprites.push(cell)
      this.container.addChild(cell)
    }

    this._addTicker()
  }

  private _addTicker(): void {
    this._ticker.add((delta) => {
      // Update the slots.
      this._previousPosition = this.position
      const targetPositions = this._getTargets()

      // if (!this._isSpinning()) return

      // Update symbol positions on reel.
      for (let j = 0; j < this.sprites.length; j++) {
        const sprite = this.sprites[j]
        const prevy = sprite.y

        sprite.y = ((this.position + j) % this.sprites.length) * config.cell.width - config.cell.width // TODO

        if (sprite.y < 0 && prevy > config.cell.width) {
          // Detect going over and swap a texture

          //first 3 "if" use for test purposes
          if (this._shouldSetTexture( this._settings.top, 1, targetPositions)){
            sprite.texture = this.cells[this._settings.top]
          } else if (this._shouldSetTexture( this._settings.center, 2, targetPositions)) {
            sprite.texture = this.cells[this._settings.center]
          } else if (this._shouldSetTexture( this._settings.bottom, 3, targetPositions)) {
            sprite.texture = this.cells[this._settings.bottom]
          } else {
            // regular swap texture
            sprite.texture = this.cells[Math.floor(Math.random() * this.cells.length)]
          }

        }
      }
    })
  }

  private _shouldSetTexture(settingsValue: number | undefined, offset: number, targetPositions: Set<number>): boolean {
    return (
      settingsValue !== undefined &&
      settingsValue < this.cells.length - 1 &&
      targetPositions.has(Math.floor(this.position) + offset)
    );
  }

  public setBlur(): void {
    this.blur.blurY = (this.position - this._previousPosition) * 16
  }

  private _lerp(startPosition: number, target: number, easing: number) {
    return startPosition * (1 - easing) + target * easing
  }

}

export default Reel