import { useEffect, useRef } from 'react'
import { useForceUpdate } from './useForceUpdate'

export const useRefState = <T extends any>(
  initialValue: T
): [Readonly<{ current: T }>, (v: T) => void] => {
  const ref = useRef<T>(initialValue)
  const forceUpdate = useForceUpdate()

  const setValue = (newValue: T) => {
    ref.current = newValue
    forceUpdate()
  }

  return [ref, setValue]
}
