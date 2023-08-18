import * as PIXI from 'pixi.js';
import { config } from '../config'

class Crank {
  private readonly _texture: PIXI.Texture
  private _sprite: PIXI.Sprite
  private _turnHandler: () => void

  public constructor(app: PIXI.Application, turnHandler: () => void) {
      this._texture = app.loader.resources!.assets.textures!['Crank.png']
      this._sprite = new PIXI.Sprite(this._texture)
      this._turnHandler = turnHandler
  }

  private initializeSprite(): void {

  }

  public onDisable(): void {
    this._sprite.interactive = true
  }

  public offDisable(): void {
    this._sprite.interactive = false
  }
}

export default Crank