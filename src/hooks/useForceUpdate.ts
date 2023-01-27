import { useState } from "react"

const useForceUpdate = () => {
  const [, setUpdateNum] = useState(0)

  const forceUpdate = () => setUpdateNum(prevUpdateNum => ++prevUpdateNum)

  return forceUpdate
}

export default useForceUpdate
