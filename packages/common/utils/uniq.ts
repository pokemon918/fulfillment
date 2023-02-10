export const uniq = <T extends string | number>(arr: T[]): T[] => {
  const result: T[] = []

  for (const item of arr) {
    if (!result.includes(item)) result.push(item)
  }

  return result
}
