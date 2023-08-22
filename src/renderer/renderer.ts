import * as PIXI from 'pixi.js'
import SlotMachine from '../machine/slot-machine'
import Background from '../background/background'
import Loader from '../loader/loader'
import LoadingScreen from '../screen/loading-screen'
import { config } from '../config'
import DevTools from '../machine/dev-tools/dev-tools'

class Renderer {
  private readonly _application: PIXI.Application
  private _slotMachine: SlotMachine | undefined
  private _background: Background | undefined
  private _loader: Loader
  private readonly _loadingScreen: LoadingScreen
  private _devTools: DevTools

  public constructor() {
    this._application = new PIXI.Application({
      height: config.render.height + config.crank.bcgHeight,
      width: config.reel.width * config.slotMachine.countReels * config.reel.scale.x + (config.sideColumn.width * 2),
      backgroundAlpha: 0,
    })

    document.body.appendChild(this._application.view)
    const root = document.getElementById('root')
    this._devTools = new DevTools(root!, this._saveSettings.bind(this))

    this._loadingScreen = new LoadingScreen(this._application, () => {
    })
    this._loader = new Loader(this._application, this._loadingScreen, this._start.bind(this))
  }

  private _start(): void {
    this._initializeBackground()
    this._initializeSlotMachine({})
  }

  private _initializeSlotMachine(settings: { [key: string]: number }): void {
    this._slotMachine = new SlotMachine(this._application, settings)

    this._application.stage.addChild(this._slotMachine.container)
  }

  private _initializeBackground(): void {
    this._background = new Background(this._application)
    this._application.stage.addChild(this._background.container)
  }

  private _saveSettings(settings: { [key: string]: number }): void {
    console.log(settings)
    // Remove existing SlotMachine instance
    if (this._slotMachine) {
      this._application.stage.removeChild(this._slotMachine.container)
      this._slotMachine = undefined
    }

    // Create a new SlotMachine instance with updated settings
    this._initializeSlotMachine(settings)
  }

}

export default Renderer
