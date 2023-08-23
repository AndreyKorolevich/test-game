import ReelMovementI, { MoveArgsT, SwapArgsT } from './reel-strategy'
import { config } from '../../config'
import { fluctuation } from '../../utilities/fluctuation'

class SpinDownStrategy implements ReelMovementI {
  topOffset = 1
  centerOffset = 2
  bottomOffset = 3
  target = config.reel.target

  public move(options: MoveArgsT): number {
    const {
      position, order, setLength, spriteSize,
    } = options
    return ((position + order) % setLength) * spriteSize - spriteSize
  }

  public isReadyToSwap(options: SwapArgsT): boolean {
    const { yPosition, spriteSize, prev } = options
    return yPosition < 0 && prev > spriteSize
  }

  public calculateStep(stage: number): number {
    return this.target * fluctuation(stage)
  }

}

export default SpinDownStrategy