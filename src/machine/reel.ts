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

  public constructor(app: PIXI.Application, position: number) {
    this._ticker = app.ticker
    this.position = position
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
  }

  public spin(propertyBeginValue: number, target: number, easing: number): void {
    this.position = this._lerp(propertyBeginValue, target, easing)
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
      cell.scale.x = cell.scale.y = Math.min(config.cell.width / cell.width, config.cell.width / cell.height)
      cell.x = Math.round((config.cell.width - cell.width) / 2)

      this.sprites.push(cell)
      this.container.addChild(cell)
    }

    this._addTicker()
  }

  private _addTicker(): void{
    this._ticker.add((delta) => {
      // Update the slots.
      this._previousPosition = this.position

      // Update symbol positions on reel.
      for (let j = 0; j < this.sprites.length; j++) {
        const s = this.sprites[j]
        const prevy = s.y

        s.y = ((this.position + j) % this.sprites.length) * config.cell.width - config.cell.width
        if (s.y < 0 && prevy > config.cell.width) {
          // Detect going over and swap a texture.
          s.texture = this.cells[Math.floor(Math.random() * this.cells.length)]
          s.scale.x = s.scale.y = Math.min(config.cell.width / s.texture.width, config.cell.width / s.texture.height)
          s.x = Math.round((config.cell.width - s.width) / 2)
        }
      }
    })
  }

  public resetBlur(): void {
    this.blur.blurY = 0
  }

  public setBlur(): void {
    this.blur.blurY = (this.position - this._previousPosition) * 16;
  }

  private _lerp(a1: number, a2: number, t: number) {
    return a1 * (1 - t) + a2 * t
  }

}

export default Reel