import { useEffect, useRef } from 'react'

type Fn = () => void | (() => void)

const useEffectOnce = (fn: Fn) => {
  const isRendered = useRef(false)

  useEffect(() => {
    // if (isRendered.current) return

    // isRendered.current = true

    return fn()
  }, [])
}

export default useEffectOnce
