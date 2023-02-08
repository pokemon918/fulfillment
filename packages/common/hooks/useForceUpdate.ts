import { useState } from 'react'

export const useForceUpdate = () => {
  const [, setUpdateNum] = useState(0)

  const forceUpdate = () => setUpdateNum((prevUpdateNum) => ++prevUpdateNum)

  return forceUpdate
}
