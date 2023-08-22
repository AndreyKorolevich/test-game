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

  public abstract dispenseWin(): void

  public abstract dispenseBalance(): void
}

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

  public dispenseWin(): void {
  }

  public dispenseBalance(): void {
  }
}

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

  public dispenseWin(): void {
  }

  public dispenseBalance(): void {
  }
}

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

  public dispenseWin(): void {
  }

  public dispenseBalance(): void {
  }
}

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

  public dispenseWin(): void {
  }

  public dispenseBalance(): void {
  }
}

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

  public dispenseWin(): void {
  }

  public dispenseBalance(): void {
  }
}

export class SpinReelsState extends MachineState {
  constructor(slotMachine: SlotMachine) {
    super(slotMachine, SLOT_MACHINE_STATE.SPIN_REELS)
  }

  public async spin(): Promise<void> {
    const config = this.slotMachine.config
    for (let i = 0; i < this.slotMachine.reels.length; i++) {
      const reel = this.slotMachine.reels[i]
      const extra = Math.floor(Math.random() * config.reel.countRows)
      const target = reel.position + config.spin.startOffset + i * config.slotMachine.countReels + extra
      const time = config.spin.firstDelay + i * config.spin.reelDelay + extra * config.spin.reelDelay

      this.slotMachine.tweenTo(reel, target, time)
    }
  }

  public cashOutBalance(): void {
    console.log('Just wait before reels are stopped')
  }

  public placeBet(): void {
    console.log('Just wait before reels are stopped')
  }

  public reduceBet(): void {
    console.log('Just wait before reels are stopped')
  }

  public turnCrank(): void {
    console.log('Reels have already spinning')
  }

  public showScreen(): void {
    console.log('There is no screen for SpinReelsState')
  }

  public hideScreen(): void {
    console.log('Nothing to hide')
  }

  public addBalance(): void {
    console.log('Just wait before reels are stopped')
  }

  public dispenseWin(): void {
  }

  public dispenseBalance(): void {
  }
}