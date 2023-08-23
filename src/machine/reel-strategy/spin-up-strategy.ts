import ReelMovementI, { MoveArgsT, SwapArgsT } from './reel-strategy'
import { config } from '../../config'
import { fluctuation } from '../../utilities/fluctuation'

class SpinUpStrategy implements ReelMovementI {
  topOffset = -2
  centerOffset = -1
  bottomOffset = 0
  target = -1 * config.reel.target

  public move(options: MoveArgsT): number {
    const {
      position, order, setLength, spriteSize, countRow = 1,
    } = options
    return ((position - order) % setLength) * spriteSize + spriteSize * countRow
  }

  public isReadyToSwap(options: SwapArgsT): boolean {
    const { yPosition, spriteSize, prev, countRow = 1 } = options
    return yPosition + spriteSize > spriteSize * countRow && prev < 0
  }

  public calculateStep(stage: number): number {
    return this.target * fluctuation(stage)
  }

}

export default SpinUpStrategy

