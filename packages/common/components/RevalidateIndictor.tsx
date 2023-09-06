import { FC, useEffect, useRef, useState } from 'react'
import { timeout } from '../utils'
import { toast } from 'react-toastify'

export interface RevalidateInfo {
  revalidate: () => Promise<void>
  paths: string[]
}

interface RevalidateIndictorProps extends RevalidateInfo {
  callback?: () => void
}

export const RevalidateIndictor: FC<RevalidateIndictorProps> = ({
  paths,
  revalidate,
  callback,
}) => {
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        await revalidate()
        await timeout(1000)
        setUpdated(true)
        if (callback) callback()
      } catch {
        toast('An error occurred while update caching, please save it again')
      }
    })()
  }, [])

  return (
    <div style={{ color: '#777' }}>
      {!updated
        ? `Updating cache of ${paths.length} pages...`
        : 'Cache Updated'}
    </div>
  )
}
