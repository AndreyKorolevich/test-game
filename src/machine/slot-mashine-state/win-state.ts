import SlotMachine from '../slot-machine'
import { MachineState, SLOT_MACHINE_STATE } from './slot-mashine-state'

export class WinState extends MachineState {
  constructor(slotMachine: SlotMachine) {
    super(slotMachine, SLOT_MACHINE_STATE.WIN)
  }

  public spin(): void {
    console.log('Place bet first please!')
  }

  public cashOutBalance(): void {
    console.log('Just wait before win screen is closed')
  }

  public placeBet(): void {
    console.log('Just wait before win screen is closed')
  }

  public reduceBet(): void {
    console.log('Place bet first please!')
  }

  public turnCrank(): void {
    console.log('Place bet first please')
  }

  public showScreen(): void {
    this.slotMachine.showWinScreen()
  }

  public hideScreen(): void {
    this.slotMachine.setState(SLOT_MACHINE_STATE.HAS_BALANCE)
  }

  public addBalance(): void {
    console.log('Just wait before win screen is closed')
  }
}