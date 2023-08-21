import * as PIXI from 'pixi.js'
import Screen from './screen'
import { config } from '../config'

class LostScreen extends Screen {
  public constructor(app: PIXI.Application, onClickHandler: () => void) {
    super(app, onClickHandler)
  }

  initializeScreen(appWidth: number, appHeight: number): void {
    const style = new PIXI.TextStyle({...config.text.textStyle, fontSize: 48} as PIXI.TextStyle)

    const text = new PIXI.Text('MAYBE NEXT TIME', style)
    text.x = config.sideColumn.width + (this.graphics.width - text.width) / 2
    text.y = (config.render.height - text.height) / 2

    this.container.addChild(text)
  }
}

export default LostScreen