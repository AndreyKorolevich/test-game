import * as PIXI from 'pixi.js'

class Reel {
  public readonly container = new PIXI.Container()
  public readonly cells: Array<PIXI.Texture>
  private _ticker: PIXI.Ticker
  public position: number
  private _previousPosition: number
  public sprites: Array<PIXI.Sprite> = []
  public blur = new PIXI.filters.BlurFilter()
  private readonly _width: number
  private readonly _countRows: number
  private readonly _getTargets: () => Set<number>
  private _config: { [key: string]: any }

  public constructor(
    app: PIXI.Application,
    position: number,
    config: { [key: string]: any },
    getTargets: () => Set<number>,
  ) {
    this._ticker = app.ticker
    this.position = position
    this._getTargets = getTargets

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
    this._config = config

    this._previousPosition = config.reel.previousPosition
    this._width = config.reel.width
    this._countRows = config.reel.countRows

    this._initializeReel(position)
  }

  public spin(startPosition: number, target: number, easing: number): void {
    this.position = this._lerp(startPosition, target, easing)
    this.setBlur()
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

    this._addTicker()
  }

  private _addTicker(): void {
    this._ticker.add((delta) => {
      // Update the slots.
      this._previousPosition = this.position
      const targetPositions = this._getTargets()

      // Update symbol positions on reel.
      for (let j = 0; j < this.sprites.length; j++) {
        const sprite = this.sprites[j]
        const prevy = sprite.y

        sprite.y = ((this.position + j) % this.sprites.length) * this._config.cell.width - this._config.cell.width // TODO

        if (sprite.y < 0 && prevy > this._config.cell.width) {
          // Detect going over and swap a texture

          // first 3 "if" use for test purposes
          if (this._shouldSetTexture(this._config.dev.top, 1, targetPositions)) {
            sprite.texture = this.cells[this._config.dev.top]
          } else if (this._shouldSetTexture(this._config.dev.center, 2, targetPositions)) {
            sprite.texture = this.cells[this._config.dev.center]
          } else if (this._shouldSetTexture(this._config.dev.bottom, 3, targetPositions)) {
            sprite.texture = this.cells[this._config.dev.bottom]
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
    )
  }

  public setBlur(): void {
    this.blur.blurY = (this.position - this._previousPosition) * 16
  }

  private _lerp(startPosition: number, target: number, easing: number): number {
    return startPosition * (1 - easing) + target * easing
  }

}

export default Reel