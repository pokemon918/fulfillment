export const calcTotal = (
  price: number | string,
  volume: number | string
): number => {
  const result = +(Number(price) * Number(volume)).toFixed(3)
  return Number.isNaN(result) ? 0 : result
}

export const calcAmount = (
  total: number | string,
  percent: number | string
): number => {
  const result = +((Number(percent) / 100) * Number(total)).toFixed(3)
  return Number.isNaN(result) ? 0 : result
}
