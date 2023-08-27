import * as PIXI from 'pixi.js'
import ReelStrategyI from './reel-strategy/reel-strategy'
import slide from '../assets/audio/end.mp3'
import { calculateBlur } from '../utilities/logDecreaseFunction'

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
  private readonly _moveStrategy: ReelStrategyI
  private readonly _sound: HTMLAudioElement = new Audio()
  private _isPlayedFinishSound: boolean = false

  public constructor(
    app: PIXI.Application,
    movement: ReelStrategyI,
    position: number,
    config: { [key: string]: any },
  ) {
    this._ticker = app.ticker
    this.position = position
    this._moveStrategy = movement

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

    this._sound.src = slide

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
  public spin(stage: number, order: number): void {
    this.position = this._moveStrategy.calculateStep(stage)

    //play sound when reel is stopped
    if (!this._isPlayedFinishSound && stage + (0.5 - order * 0.1) > 1) {
      this._playFinishSound()
      this._isPlayedFinishSound = true
    }

    if (stage === 1) {
      this._isPlayedFinishSound = false
    }

    this.blur.blurY = calculateBlur(stage)

    // Update positions of elements in reel
    for (let i = 0; i < this.sprites.length; i++) {
      const sprite = this.sprites[i]
      const prev = sprite.y

      sprite.y = this._moveStrategy.move({
        position: this.position,
        order: i,
        setLength: this.sprites.length,
        spriteSize: this._config.cell.width,
        countRow: this._config.reel.countRows,
      })

      // Detect when element is going over and exchange a texture
      if (this._moveStrategy.isReadyToSwap({
        yPosition: sprite.y,
        spriteSize: sprite.width,
        prev,
        countRow: this._config.reel.countRows,
      })) {

        // first 3 "if" use for test purposes with devTools
        if (this._shouldSetTexture(this._config.dev.top, this._moveStrategy.topOffset, this._moveStrategy.target)) {
          sprite.texture = this.cells[this._config.dev.top]
        } else if (this._shouldSetTexture(this._config.dev.center, this._moveStrategy.centerOffset, this._moveStrategy.target)) {
          sprite.texture = this.cells[this._config.dev.center]
        } else if (this._shouldSetTexture(this._config.dev.bottom, this._moveStrategy.bottomOffset, this._moveStrategy.target)) {
          sprite.texture = this.cells[this._config.dev.bottom]
        } else {
          // regular swap texture
          sprite.texture = this.cells[Math.floor(Math.random() * this.cells.length)]
        }
      }
    }
  }

  private _playFinishSound() {
    this._sound.play()
  }

  // check if there is some dev tools settings
  private _shouldSetTexture(settingsValue: number | undefined, offset: number, targetPosition: number): boolean {
    return (
      settingsValue !== undefined &&
      settingsValue < this.cells.length &&
      targetPosition === Math.floor(this.position) + offset
    )
  }
}

export default Reel