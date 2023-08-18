import * as PIXI from 'pixi.js'
import { config } from '../config'

abstract class Screen {
  public container: PIXI.Container = new PIXI.Container()
  public graphics: PIXI.Graphics = new PIXI.Graphics()

  protected constructor(app: PIXI.Application) {
    this.initializeScreen()
  }

  abstract initializeScreen(): void

  public show(): void {
    this.container.visible = true
  }

  public hide(): void {
    this.container.visible = false
  }

}

export default Screen