import * as PIXI from 'pixi.js'

class Crank {
  public container: PIXI.Container = new PIXI.Container()
  private readonly _downTexture: PIXI.Texture
  private readonly _upTexture: PIXI.Texture
  private readonly _bcgTexture: PIXI.Texture
  private readonly _crank: PIXI.Sprite
  private readonly _bcg: PIXI.Sprite
  private readonly _turnHandler: () => void

  public constructor(app: PIXI.Application, turnHandler: () => void) {
    this._upTexture = app.loader.resources!.asset.textures!['crank-abl.png']
    this._downTexture = app.loader.resources!.asset.textures!['crank-dis.png']
    this._bcgTexture = app.loader.resources!.asset.textures!['crank-bcg.png']

    this._crank = new PIXI.Sprite(this._upTexture)
    this._bcg = new PIXI.Sprite(this._bcgTexture)


    this._turnHandler = turnHandler
    this._initializeSprite(app.screen.width, app.screen.height)
  }

  private _initializeSprite(appWidth: number, appHeight: number): void {
    // put button`s background to the bottom-center of the canvas
    this._bcg.x = appWidth / 2 - this._bcg.width / 2
    this._bcg.y = appHeight - this._bcg.height

    // put button to the center of the background
    this._crank.x = appWidth / 2 - this._crank.width / 2
    this._crank.y = appHeight - (this._crank.height +  (this._bcg.height - this._crank.height) / 2)

    // make button interactive add click handler
    this._crank.interactive = true
    this._crank.buttonMode = true
    this._crank.addListener('pointerdown', this._turnHandler);

    this.container.addChild(this._bcg, this._crank)
  }

  public onDisable(): void {
    this._crank.interactive = false
    this._crank.texture = this._downTexture
  }

  public offDisable(): void {
    this._crank.interactive = true
    this._crank.texture = this._upTexture
  }
}

export default Crank