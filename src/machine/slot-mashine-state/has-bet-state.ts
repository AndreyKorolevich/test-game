import SlotMachine from '../slot-machine'
import { MachineState, SLOT_MACHINE_STATE } from './slot-mashine-state'

export class HasBetState extends MachineState {
  constructor(slotMachine: SlotMachine) {
    super(slotMachine, SLOT_MACHINE_STATE.HAS_BET)
  }

  public spin(): void {
    console.log('Turn crank to spin reels')
  }

  public cashOutBalance(): void {
    this.slotMachine.decBalance()
  }

  public placeBet(): void {
    this.slotMachine.incBet()
  }

  public reduceBet(): void {
    this.slotMachine.decBet()
    if (this.slotMachine.getBet() <= 0 && this.slotMachine.getBalance() > 0) {
      this.slotMachine.setState(SLOT_MACHINE_STATE.HAS_BALANCE)
    } else if (this.slotMachine.getBet() <= 0 && this.slotMachine.getBet() <= 0) {
      this.slotMachine.setState(SLOT_MACHINE_STATE.NO_BALANCE)
    }
  }

  public turnCrank(): void {
    this.slotMachine.crank.onDisable()
    this.slotMachine.setState(SLOT_MACHINE_STATE.SPIN_REELS)
    this.slotMachine.spin()
  }

  public showScreen(): void {
    console.log('Opps there is no screen for HasBetState')
  }

  public hideScreen(): void {
    console.log('Nothing to hide')
  }

  public addBalance(): void {
    this.slotMachine.incBalance()
  }
}