import { useRef } from "react"
import useForceUpdate from "./useForceUpdate"

const useSameState = (initialState: any) => {
  const state = useRef(initialState)

  const forceUpdate = useForceUpdate()

  const setState = (updatedState: any) => {
    if (state.current !== updatedState) {
      state.current = updatedState
      forceUpdate()
    }
  }

  return [state.current, setState]
}

export default useSameState
