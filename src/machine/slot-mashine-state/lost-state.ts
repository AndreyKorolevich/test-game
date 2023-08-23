import SlotMachine from '../slot-machine'
import { MachineState, SLOT_MACHINE_STATE } from './slot-mashine-state'

export class LostState extends MachineState {
  constructor(slotMachine: SlotMachine) {
    super(slotMachine, SLOT_MACHINE_STATE.LOST)
  }

  public spin(): void {
    console.log('Place bet first please!')
  }

  public cashOutBalance(): void {
    console.log('Just wait before lost screen is closed')
  }

  public placeBet(): void {
    console.log('Just wait before lost screen is closed')
  }

  public reduceBet(): void {
    console.log('Place bet first please!')
  }

  public turnCrank(): void {
    console.log('Place bet first please')
  }

  public showScreen(): void {
    this.slotMachine.showLostScreen()
  }

  public hideScreen(): void {
    if (this.slotMachine.getBalance() > 0) {
      this.slotMachine.setState(SLOT_MACHINE_STATE.HAS_BALANCE)
    } else {
      this.slotMachine.setState(SLOT_MACHINE_STATE.NO_BALANCE)
    }

  }

  public addBalance(): void {
    console.log('Just wait before lost screen is closed')
  }
}