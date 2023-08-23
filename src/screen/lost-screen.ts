import * as PIXI from 'pixi.js'
import Screen from './screen'
import lost from '../assets/audio/lost.mp3'

class LostScreen extends Screen {
  public constructor(app: PIXI.Application, config: { [key: string]: any }, onClickHandler: () => void) {
    super(app, config, onClickHandler)

    this.sound.src = lost
  }

  initializeScreen(appWidth: number, appHeight: number): void {
    const style = new PIXI.TextStyle({ ...this.config.text.textStyle, fontSize: 48 } as PIXI.TextStyle)

    const text = new PIXI.Text('MAYBE NEXT TIME', style)
    text.x = this.config.sideColumn.width + (this.graphics.width - text.width) / 2
    text.y = (this.config.render.height - text.height) / 2

    this.container.addChild(text)
  }
}

export default LostScreen