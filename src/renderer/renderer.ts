import * as PIXI from 'pixi.js'
import SlotMachine from '../machine/slot-machine'
import Background from '../background/background'
import Loader from '../loader/loader'
import LoadingScreen from '../screen/loading-screen'
import { config } from '../config'

class Renderer {
  private readonly _application: PIXI.Application
  private _slotMachine: SlotMachine | undefined
  private _background: Background | undefined
  private _loader: Loader
  private readonly _loadingScreen: LoadingScreen

  public constructor() {
    this._application = new PIXI.Application({
      height: config.render.height + config.crank.bcgHeight,
      width: config.reel.width * config.slotMachine.countReels + (config.sideColumn.width * 2),
      backgroundAlpha: 0,
    })

    document.body.appendChild(this._application.view)

    this._loadingScreen = new LoadingScreen(this._application, () => {})
    this._loader = new Loader(this._application,  this._loadingScreen, this._start.bind(this))
  }

  private _start(): void {
    this._initializeBackground()
    this._initializeSlotMachine()
  }

  private _initializeSlotMachine(): void {
    this._slotMachine = new SlotMachine(this._application)

    this._application.stage.addChild(this._slotMachine.container)
  }

  private _initializeBackground(): void {
    this._background = new Background(this._application)
    this._application.stage.addChild(this._background.container)
  }
}

export default Renderer
