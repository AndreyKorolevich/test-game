import * as PIXI from 'pixi.js'

class Loader {
  private _loader: PIXI.Loader
  public isLoading: boolean = false

  public constructor(app: PIXI.Application, handlerEndLoading: () => void) {
    this._loader = app.loader
    this.isLoading = true
    this._onLoadData()
    this._loader.load(this._onDataLoaded(handlerEndLoading))
  }

  private _onLoadData(): void {
    this._loader.add('asset', 'asset1.json')
  }

  private _onDataLoaded(handlerEndLoading: () => void) {
    return () => {
      handlerEndLoading()
      this.isLoading = false
    }
  }

}

export default Loader