export const calculateBlur = (stage: number): number  => {
  return Math.log(stage) / Math.log(0.5)
}