import * as PIXI from 'pixi.js'
import Screen from './screen'

class LoadingScreen extends Screen {
  public constructor(app: PIXI.Application, onClickHandler: () => void) {
    super(app, onClickHandler)
  }

  initializeScreen(): void {

  }


}

export default LoadingScreen