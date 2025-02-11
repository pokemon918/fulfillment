/**
 * The maximum is exclusive and the minimum is inclusive
 */
export const genRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}
