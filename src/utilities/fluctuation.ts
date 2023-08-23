// add effect of when reel spin a little more than it need and then return to correct position
export const fluctuation = (amount: number): number => {
  return (--amount * amount * (1.5 * amount + 0.5) + 1)
}