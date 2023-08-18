import * as PIXI from 'pixi.js';
import { config } from '../config'

class Reel {
  public readonly container = new PIXI.Container()
  private _cells: Array<PIXI.Texture>
  private _ticker: PIXI.Ticker
  private _position: number
  private _sprites: Array<PIXI.Sprite> = []
  private _blur: PIXI.filters.BlurFilter = new PIXI.filters.BlurFilter()
  private _width: number = config.reel.width
  private _countRows: number  = config.reel.countRows
  private _scale: number  = config.reel.scale
  private _speed: number  = config.reel.speed
  private _previousPosition: number  = config.reel.previousPosition
  private _isSpinning: boolean  = config.reel.isSpinning

  public constructor(app: PIXI.Application, position: number) {
    this._ticker = app.ticker
    this._position = position
    this._cells = [
      app.loader.resources.assets.textures!['Slot1.png'],
      app.loader.resources.assets.textures!['Slot2.png'],
      app.loader.resources.assets.textures!['Slot3.png'],
      app.loader.resources.assets.textures!['Slot4.png'],
    ]
  }

  public spin(): void {

  }

  private initializeSprite(position: number): void {

  }
}

export default Reel