import * as PIXI from 'pixi.js'
import Screen from './screen'
import win from '../assets/audio/win.mp3'

class WinScreen extends Screen {
  public constructor(app: PIXI.Application, config: { [key: string]: any }, onClickHandler: () => void) {
    super(app, config, onClickHandler)
    this.sound.src = win
  }

  initializeScreen(appWidth: number, appHeight: number): void {
    const style = new PIXI.TextStyle({ ...this.config.text.textStyle, fontSize: 48 } as PIXI.TextStyle)

    const text = new PIXI.Text('WOW YOU WON', style)
    text.x = this.config.sideColumn.width + (this.graphics.width - text.width) / 2
    text.y = (this.config.render.height - text.height) / 2

    this.container.addChild(text)
  }


}

export default WinScreen