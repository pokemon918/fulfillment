import { useRef } from 'react'
import useForceUpdate from './useForceUpdate'

const useSameState = <T extends any>(
  initialState: T
): [T, (updatedState: T) => void] => {
  const state = useRef(initialState)

  const forceUpdate = useForceUpdate()

  const setState = (updatedState: T) => {
    if (state.current !== updatedState) {
      state.current = updatedState
      forceUpdate()
    }
  }

  return [state.current, setState]
}

export default useSameState
