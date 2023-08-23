import SlotMachine from '../slot-machine'

export enum SLOT_MACHINE_STATE {
  NO_BALANCE = 'NO_BALANCE',
  HAS_BALANCE = 'HAS_BALANCE',
  HAS_BET = 'HAS_BET',
  WIN = 'WIN',
  LOST = 'LOST',
  SPIN_REELS = 'SPIN_REELS',
}

export abstract class MachineState {
  public state: SLOT_MACHINE_STATE
  public slotMachine: SlotMachine

  protected constructor(slotMachine: SlotMachine, state: SLOT_MACHINE_STATE) {
    this.slotMachine = slotMachine
    this.state = state
  }

  public abstract spin(): void

  public abstract cashOutBalance(): void

  public abstract placeBet(): void

  public abstract reduceBet(): void

  public abstract turnCrank(): void

  public abstract showScreen(): void

  public abstract hideScreen(): void

  public abstract addBalance(): void
}