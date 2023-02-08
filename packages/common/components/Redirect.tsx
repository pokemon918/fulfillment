import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

interface RedirectProps {
  to: string
}

export const Redirect: FC<RedirectProps> = ({ to }) => {
  const router = useRouter()

  useEffect(() => {
    router.push(to)
  }, [])

  return null
}
