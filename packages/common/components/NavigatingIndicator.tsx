import { useRouter } from 'next/router'
import { LinearProgress } from '../ui'
import { useEffect, useState } from 'react'

export const NavigatingIndicator = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const onChangeStart = () => {
      setLoading(true)
    }

    const onChangeComplete = () => {
      setLoading(false)
    }

    const onChangeError = () => {
      setLoading(false)
    }

    router.events.on('routeChangeStart', onChangeStart)
    router.events.on('routeChangeComplete', onChangeComplete)
    router.events.on('routeChangeError', onChangeError)

    return () => {
      router.events.off('routeChangeStart', onChangeStart)
      router.events.off('routeChangeComplete', onChangeComplete)
      router.events.off('routeChangeError', onChangeError)
    }
  }, [])

  return loading ? <LinearProgress fixed /> : null
}

