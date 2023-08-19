import * as PIXI from 'pixi.js'
import { config } from '../config'

class Background {
  public readonly container = new PIXI.Container()
  private readonly _columnTexture: PIXI.Texture
  private readonly _reelTexture: PIXI.Texture

  public constructor(app: PIXI.Application) {
    this._columnTexture = app.loader.resources.asset.textures!['column.png']
    this._reelTexture = app.loader.resources.asset.textures!['reel.png']

    // Create sprite instances for both columns
    const leftColumn = new PIXI.Sprite(this._columnTexture)
    const rightColumn = new PIXI.Sprite(this._columnTexture)

    //Set the positions of the columns within the container

    rightColumn.x = app.screen.width + 3
    rightColumn.y = rightColumn.height

    // Rotate the right column by 180 degrees
    rightColumn.rotation = Math.PI

    // Add the columns to the container
    this.container.addChild(leftColumn, rightColumn)

    // fill the background with reels
    for(let i = 0; i < config.slotMachine.countReels; i++){
      const reelColumn = new PIXI.Sprite(this._reelTexture)
      reelColumn.x = leftColumn.width + i * reelColumn.width
      this.container.addChild(reelColumn)
    }
  }
}

export default Background