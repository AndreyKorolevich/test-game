import * as PIXI from 'pixi.js'
import { config } from '../config'

class Background {
  public sprite: PIXI.Sprite
  private readonly _ground: PIXI.Texture

  public constructor(app: PIXI.Application) {
    this._ground = app.loader.resources.assets.textures!['Bcg.png']
    this.sprite = new PIXI.Sprite(this._ground)
  }
}

export default Background