import * as PIXI from 'pixi.js'
import SlotMachine from '../machine/slot-machine'
import Background from '../background/background'
import Loader from '../loader/loader'
import { config } from '../config'
import DevTools from '../dev-tools/dev-tools'

class Renderer {
  private readonly _application: PIXI.Application
  private _slotMachine: SlotMachine | undefined
  private _background: Background | undefined
  private _loader: Loader
  private _devTools: DevTools
  private _config: { [key: string]: any } = config

  public constructor() {
    const root = document.getElementById('root')
    this._devTools = new DevTools(root!, this._saveSettings.bind(this))

    this._application = new PIXI.Application({
      height: config.render.height + config.crank.bcgHeight,
      width: config.reel.width * config.slotMachine.countReels * config.reel.scale.x + (config.sideColumn.width * 2),
      transparent: true,
      view: document.getElementById('game') as HTMLCanvasElement,
    })

    document.body.appendChild(this._application.view)

    this._loader = new Loader(this._application, this._start.bind(this))
  }

  private _start(): void {
    this._initializeBackground()
    this._initializeSlotMachine()
  }

  private _initializeSlotMachine(): void {
    this._slotMachine = new SlotMachine(this._application, this._config)
    this._application.stage.addChild(this._slotMachine.container)
  }

  private _initializeBackground(): void {
    this._background = new Background(this._application, this._config)
    this._application.stage.addChild(this._background.container)
  }

  // resize canvas to fit different screen resolutions
  private _resizeScreen(): void {
    this._application.view.width = this._config.reel.width * this._config.slotMachine.countReels * this._config.reel.scale.x + (this._config.sideColumn.width * 2)
    this._application.screen.width = this._config.reel.width * this._config.slotMachine.countReels * this._config.reel.scale.x + (this._config.sideColumn.width * 2)
    this._application.view.height = this._config.cell.width * this._config.reel.countRows + this._config.crank.bcgHeight
    this._application.screen.height = this._config.cell.width * this._config.reel.countRows + this._config.crank.bcgHeight
  }

  private _saveSettings(settings: { [key: string]: number }): void {
    // Remove existing SlotMachine instance
    if (this._slotMachine) {
      this._application.stage.removeChild(this._slotMachine.container)
      this._slotMachine = undefined
    }

    // Remove existing Background instance
    if (this._background) {
      this._application.stage.removeChild(this._background.container)
      this._background = undefined
    }

    // redefine values that define in devtools
    this._config = {
      ...this._config,
      slotMachine: {
        ...this._config.slotMachine,
        countReels: settings.reel !== undefined ? settings.reel : this._config.slotMachine.countReels,
      },
      reel: {
        ...this._config.reel,
        countRows: settings.row !== undefined ? settings.row : this._config.reel.countRows,
      },
      dev: {
        top: settings.top,
        center: settings.center,
        bottom: settings.bottom,
      },
    }

    this._resizeScreen()

    // Create a new SlotMachine and Background instance with updated settings
    this._start()
  }

}

export default Renderer
