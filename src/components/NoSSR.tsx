import { FC, ReactNode, useEffect, useState } from 'react'

const NoSSR: FC<{ children: ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return mounted ? <>{children}</> : null
}

export default NoSSR
