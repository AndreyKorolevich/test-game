import * as PIXI from 'pixi.js'
import background from '../assets/audio/background.mp3'

class Background {
  public readonly container = new PIXI.Container()
  private readonly _columnTexture: PIXI.Texture
  private readonly _reelTexture: PIXI.Texture
  private _config: { [key: string]: any }
  public readonly _sound: HTMLAudioElement

  public constructor(app: PIXI.Application, config: { [key: string]: any }) {
    this._columnTexture = app.loader.resources.asset.textures!['column.png']
    this._reelTexture = app.loader.resources.asset.textures!['reel.png']

    this._config = config

    // Create sprite instances for both columns
    const leftColumn = new PIXI.Sprite(this._columnTexture)
    const rightColumn = new PIXI.Sprite(this._columnTexture)

    //Set the positions of the columns within the container

    rightColumn.x = app.screen.width

    // Rotate the right column by 180 degrees
    rightColumn.rotation = Math.PI

    leftColumn.scale.y = this._config.reel.countRows / 3
    rightColumn.scale.y = this._config.reel.countRows / 3

    rightColumn.y = rightColumn.height

    // Add the columns to the container
    this.container.addChild(leftColumn, rightColumn)

    // fill the background with reels
    for (let i = 0; i < this._config.slotMachine.countReels; i++) {
      const reel = new PIXI.Sprite(this._reelTexture)
      reel.x = leftColumn.width + i * reel.width * this._config.reel.scale.x
      reel.scale.x = this._config.reel.scale.x
      reel.scale.y = this._config.reel.countRows / 3
      this.container.addChild(reel)
    }
    this._sound = new Audio()
    this._sound.src = background
    this._sound.volume = 0.1
    this._sound.loop = true
    this._sound.play()
  }
}

export default Background