import * as PIXI from 'pixi.js'
import Screen from '../screen/screen'


class Loader {
  private _loader: PIXI.Loader
  public isLoading: boolean = false

  public constructor(app: PIXI.Application, loadingScreen: Screen, handlerEndLoading: () => void) {
    this._loader = app.loader
    this.isLoading = true
    loadingScreen.show()
    this._onLoadData()
    this._loader.load(this._onDataLoaded(loadingScreen, handlerEndLoading))
  }

  private _onLoadData(): void {
    this._loader.add('asset', 'asset1.json')
  }

  private _onDataLoaded(loadingScreen: Screen, handlerEndLoading: () => void) {
    return () => {
      loadingScreen.hide()
      handlerEndLoading()
      this.isLoading = false
    }
  }

}

export default Loader