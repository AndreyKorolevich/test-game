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
  private _state: SLOT_MACHINE_STATE
  private _slotMachine: SlotMachine

  protected constructor(slotMachine: SlotMachine, state: SLOT_MACHINE_STATE) {
    this._slotMachine = slotMachine
    this._state = state
  }

  public abstract resetBalance(): void

  public abstract placeBet(): void

  public abstract turnCrank(): void

  public abstract addBalanceAfterWin(): void

  public abstract addBalance(): void

  public abstract dispenseWin(): void

  public abstract dispenseBalance(): void
}

export class NoBalanceState extends MachineState {
  constructor(slotMachine: SlotMachine) {
    super(slotMachine, SLOT_MACHINE_STATE.NO_BALANCE)
  }

  public resetBalance(): void {
  }

  public placeBet(): void {
  }

  public turnCrank(): void {
  }

  public addBalanceAfterWin(): void {
  }

  public addBalance(): void {
  }

  public dispenseWin(): void {
  }

  public dispenseBalance(): void {
  }
}

export class HasBalanceState extends MachineState {
  constructor(slotMachine: SlotMachine) {
    super(slotMachine, SLOT_MACHINE_STATE.HAS_BALANCE)
  }

  public resetBalance(): void {
  }

  public placeBet(): void {
  }

  public turnCrank(): void {
  }

  public addBalanceAfterWin(): void {
  }

  public addBalance(): void {
  }

  public dispenseWin(): void {
  }

  public dispenseBalance(): void {
  }
}

export class HasBetState extends MachineState {
  constructor(slotMachine: SlotMachine) {
    super(slotMachine, SLOT_MACHINE_STATE.HAS_BET)
  }

  public resetBalance(): void {
  }

  public placeBet(): void {
  }

  public turnCrank(): void {
  }

  public addBalanceAfterWin(): void {
  }

  public addBalance(): void {
  }

  public dispenseWin(): void {
  }

  public dispenseBalance(): void {
  }
}

export class WinState extends MachineState {
  constructor(slotMachine: SlotMachine) {
    super(slotMachine, SLOT_MACHINE_STATE.WIN)
  }

  public resetBalance(): void {
  }

  public placeBet(): void {
  }

  public turnCrank(): void {
  }

  public addBalanceAfterWin(): void {
  }

  public addBalance(): void {
  }

  public dispenseWin(): void {
  }

  public dispenseBalance(): void {
  }
}

export class LostState extends MachineState {
  constructor(slotMachine: SlotMachine) {
    super(slotMachine, SLOT_MACHINE_STATE.LOST)
  }

  public resetBalance(): void {
  }

  public placeBet(): void {
  }

  public turnCrank(): void {
  }

  public addBalanceAfterWin(): void {
  }

  public addBalance(): void {
  }

  public dispenseWin(): void {
  }

  public dispenseBalance(): void {
  }
}

export class SpinReelsState extends MachineState {
  constructor(slotMachine: SlotMachine) {
    super(slotMachine, SLOT_MACHINE_STATE.SPIN_REELS)
  }

  public resetBalance(): void {
  }

  public placeBet(): void {
  }

  public turnCrank(): void {
  }

  public addBalanceAfterWin(): void {
  }

  public addBalance(): void {
  }

  public dispenseWin(): void {
  }

  public dispenseBalance(): void {
  }
}