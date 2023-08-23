import SlotMachine, { AnimationT } from '../slot-machine'
import { MachineState, SLOT_MACHINE_STATE } from './slot-mashine-state'

export class SpinReelsState extends MachineState {
  constructor(slotMachine: SlotMachine) {
    super(slotMachine, SLOT_MACHINE_STATE.SPIN_REELS)
  }

  public spin(): void {
    const config = this.slotMachine.config
    for (let i = 0; i < this.slotMachine.reels.length; i++) {
      const reel = this.slotMachine.reels[i]
      const delay = config.spin.firstDelay +  i * config.spin.reelDelay + config.spin.reelDelay

      const animation: AnimationT = {
        reel,
        delay,
        start: Date.now(),
      }
      this.slotMachine.packAnimation(animation)
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
}