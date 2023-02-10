import { useRef } from 'react'

const useHistoryRef = <T extends any>(initialValue: T) => {
  const ref = useRef<T[]>([initialValue])

  return {
    append: (value: Exclude<T, undefined>) => ref.current.push(value),
    current: () => ref.current[ref.current.length - 1] ?? undefined,
    prev: () => ref.current[ref.current.length - 2] ?? undefined,
  }
}

export default useHistoryRef
