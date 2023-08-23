export type MoveArgsT = {
  position: number,
  order: number,
  setLength: number,
  spriteSize: number,
  countRow?: number
}

export type SwapArgsT = {
  yPosition: number,
  spriteSize: number,
  prev: number,
  countRow?: number
}

interface ReelMovementI {
  topOffset: number,
  centerOffset: number
  bottomOffset: number
  target: number

  move(options: MoveArgsT): number

  isReadyToSwap(options: SwapArgsT): boolean

  calculateStep(stage: number): number
}

export default ReelMovementI