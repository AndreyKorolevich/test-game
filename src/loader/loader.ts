import * as PIXI from 'pixi.js'
import { config } from '../config'
import Screen from '../screen/screen'


class Loader {
  private _loader: PIXI.Loader
  public isLoading: boolean = false

  public constructor(app: PIXI.Application, loadingScreen: Screen, handlerEndLoading: () => void) {
    this._loader = app.loader
    this.isLoading = true
    loadingScreen.show()
    this._onLoadData()
    this._loader.load(this._endLoading(loadingScreen, handlerEndLoading))
  }

  private _onLoadData(): void {
    this._loader.add('assets', './assets/asset.json')
  }

  private _endLoading(loadingScreen: Screen, handlerEndLoading: () => void) {
    return () => {
      loadingScreen.hide()
      handlerEndLoading()
      this.isLoading = false
    }
  }

}

export default Loader