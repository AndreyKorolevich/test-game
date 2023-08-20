import * as PIXI from 'pixi.js'
import { config } from '../config'

class Reel {
  public readonly container = new PIXI.Container()
  public readonly cells: Array<PIXI.Texture>
  private _ticker: PIXI.Ticker
  public position: number
  public sprites: Array<PIXI.Sprite> = []
  public blur = new PIXI.filters.BlurFilter()
  private _width: number = config.reel.width
  private _countRows: number = config.reel.countRows
  private _speed: number = config.reel.speed
  private _isSpinning: boolean = config.reel.isSpinning

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

  public spin(): Promise<void> {
    this._isSpinning = true
    let topOffset = Math.floor((config.reel.height - this.sprites[0].height * this._countRows) / this._countRows / 2)
    this._setBlur()

    return new Promise<void>(resolve => {
      const tick = () => {
        for (let i = this.sprites.length - 1; i >= 0; i--) {
          const cell = this.sprites[i]

          if (cell.y + this._speed > config.reel.height + topOffset) {
            this._isSpinning = false
            cell.y = -(cell.height + topOffset)
          } else {
            cell.y += this._speed
          }

          if (i === 0 && !this._isSpinning) {
            let lastCell = this.sprites.pop()
            if (lastCell) {
              this.sprites.unshift(lastCell)
            }
            this._ticker.remove(tick)
            resolve()
          }
        }
      }

      this._ticker.add(tick)
    })
  }

  private _initializeReel(position: number): void {
    this.blur.blurX = 0
    this.blur.blurY = 0
    this.container.x = position * this._width
    this.container.filters = [this.blur]

    for (let i = 0; i < this._countRows + 1; i++) {
      const cell = new PIXI.Sprite(this.cells[Math.floor(Math.random() * this.cells.length)])
      const topOffset = (config.reel.height - cell.height * this._countRows) / this._countRows
      const boxHeight = cell.height + topOffset
      const padding = topOffset / 2
      cell.y = (i - 1) * boxHeight + padding
      this.sprites.push(cell)
      this.container.addChild(cell)
    }
  }

  public resetBlur(): void {
    this.blur.blurY = 0
  }

  private _setBlur(): void {
    this.blur.blurY = 6
  }
}

export default Reel