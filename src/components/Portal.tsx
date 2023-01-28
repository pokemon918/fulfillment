import { FC, ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const Portal: FC<{ children: ReactNode }> = ({ children }) => {
  const { current: container } = useRef(document.createElement('div'))

  useEffect(() => {
    document.body.appendChild(container)

    return () => {
      document.body.removeChild(container)
    }
  }, [])

  return createPortal(children, container)
}

export default Portal
