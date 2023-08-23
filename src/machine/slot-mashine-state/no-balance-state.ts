import SlotMachine from '../slot-machine'
import { MachineState, SLOT_MACHINE_STATE } from './slot-mashine-state'

export class NoBalanceState extends MachineState {
  constructor(slotMachine: SlotMachine) {
    super(slotMachine, SLOT_MACHINE_STATE.NO_BALANCE)
  }

  public spin(): void {
    console.log('Add balance and place bet first')
  }

  public addBalance(): void {
    this.slotMachine.setState(SLOT_MACHINE_STATE.HAS_BALANCE)
    this.slotMachine.incBalance()
  }

  public cashOutBalance(): void {
    console.log('You do not have money in your wallet')
  }

  public placeBet(): void {
    console.log('Add balance first please')
  }

  public reduceBet(): void {
    console.log('Add balance and place bet first please')
  }

  public turnCrank(): void {
    console.log('Add balance first please')
  }

  public showScreen(): void {
    console.log('Opps there is no screen for NoBalanceState')
  }

  public hideScreen(): void {
    console.log('Nothing to hide')
  }
}