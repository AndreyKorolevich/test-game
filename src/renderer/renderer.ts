import * as PIXI from 'pixi.js'
import SlotMachine from '../machine/slot-machine'
import Background from '../background/background'
import Loader from '../loader/loader'
import WinScreen from '../screen/win-screen'
import LostScreen from '../screen/lost-screen'
import LoadingScreen from '../screen/loading-screen'

class Renderer {
  private readonly _application: PIXI.Application
  private _slotMachine: SlotMachine | undefined
  private _background: Background | undefined
  private _loader: Loader
  private _winScreen: WinScreen | undefined
  private _lostScreen: LostScreen | undefined
  private readonly _loadingScreen: LoadingScreen

  public constructor() {
    this._application = new PIXI.Application({
      backgroundColor: 0x000000,
      autoStart: true,
    })

    document.body.appendChild(this._application.view)

    this._loadingScreen = new LoadingScreen(this._application)
    this._loader = new Loader(this._application,  this._loadingScreen, this._start)
  }

  private _start(): void {
    this._initializeScreens()
    this._initializeSlotMachine()
    this._initializeBackground()
  }

  private _initializeScreens(): void {
    this._lostScreen = new LostScreen(this._application)
    this._winScreen = new WinScreen(this._application)

    this._application.stage.addChild(this._lostScreen.container)
    this._application.stage.addChild(this._winScreen.container)
  }

  private _initializeSlotMachine(): void {
    this._slotMachine = new SlotMachine(this._application)

    this._application.stage.addChild(this._slotMachine.container)
  }

  private _initializeBackground(): void {
    this._background = new Background(this._application)
    this._application.stage.addChild(this._background.sprite)
  }
}

export default Renderer
