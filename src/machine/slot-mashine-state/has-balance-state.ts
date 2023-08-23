import SlotMachine from '../slot-machine'
import { MachineState, SLOT_MACHINE_STATE } from './slot-mashine-state'

export class HasBalanceState extends MachineState {
  constructor(slotMachine: SlotMachine) {
    super(slotMachine, SLOT_MACHINE_STATE.HAS_BALANCE)
  }

  public spin(): void {
    console.log('Place bet first')
  }

  public cashOutBalance(): void {
    this.slotMachine.decBalance()
    this.slotMachine.setState(SLOT_MACHINE_STATE.NO_BALANCE)
  }

  public addBalance(): void {
    this.slotMachine.incBalance()
  }

  public placeBet(): void {
    this.slotMachine.incBet()

    if (this.slotMachine.getBet() < 0) {
      console.log('Your balance is too small')
      return
    }
    this.slotMachine.setState(SLOT_MACHINE_STATE.HAS_BET)
  }

  public reduceBet(): void {
    console.log('Place bet first please')
  }

  public turnCrank(): void {
    console.log('Place bet first please')
  }

  public showScreen(): void {
    console.log('Opps there is no screen for HasBalanceState')
  }

  public hideScreen(): void {
    console.log('Nothing to hide')
  }
}