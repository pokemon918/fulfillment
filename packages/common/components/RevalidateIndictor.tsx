import { FC, useEffect, useRef, useState } from 'react'

export interface RevalidateInfo {
  revalidatePromise: Promise<void>
  paths: string[]
}

interface RevalidateIndictorProps extends RevalidateInfo {
  callback?: () => void
}

export const RevalidateIndictor: FC<RevalidateIndictorProps> = ({
  paths,
  revalidatePromise,
  callback,
}) => {
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        await revalidatePromise
        setUpdated(true)
        if (callback) callback()
      } catch {
        alert('An error occurred while update caching, please save it again')
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
