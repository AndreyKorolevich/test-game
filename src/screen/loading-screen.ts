import * as PIXI from 'pixi.js'
import { config } from '../config'
import Screen from './screen'

class LoadingScreen extends Screen {
  public constructor(app: PIXI.Application) {
    super(app)
  }

  initializeScreen(): void {

  }


}

export default LoadingScreen