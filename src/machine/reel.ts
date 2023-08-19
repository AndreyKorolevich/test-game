import * as PIXI from 'pixi.js'
import { config } from '../config'

class Reel {
  public readonly container = new PIXI.Container()
  private _cells: Array<PIXI.Texture>
  private _ticker: PIXI.Ticker
  private _position: number
  private _sprites: Array<PIXI.Sprite> = []
  private _blur: PIXI.Filter = new PIXI.filters.BlurFilter()
  private _width: number = config.reel.width
  private _countRows: number = config.reel.countRows
  private _scale: number = config.reel.scale
  private _speed: number = config.reel.speed
  private _previousPosition: number = config.reel.previousPosition
  private _isSpinning: boolean = config.reel.isSpinning

  public constructor(app: PIXI.Application, position: number) {
    this._ticker = app.ticker
    this._position = position
    this._cells = [
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

  public spin(): void {

  }

  private _initializeReel(position: number): void {
    this.container.x = position * config.reel.width

    for (let i = 0; i < config.reel.countRows * 3; i++) {
      const cell = new PIXI.Sprite(this._cells[Math.floor(Math.random() * this._cells.length)])
      cell.scale.set(0.9)
      const widthDiff = position * config.reel.width - cell.width
      const yOffset = (config.reel.height - cell.height * config.reel.countRows) / 3
      const cellHeight = cell.height + yOffset
      const paddingTop = yOffset / 2
      cell.y = (i - 1) * cellHeight + paddingTop
      this._sprites.push(cell)
      this.container.addChild(cell)
    }
  }
}

export default Reel