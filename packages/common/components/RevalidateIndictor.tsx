import { FC, useEffect, useRef, useState } from 'react'

interface RevalidateIndictorProps {
  revalidatePromise: Promise<any>
  paths: string[]
}

export const RevalidateIndictor: FC<RevalidateIndictorProps> = ({
  paths,
  revalidatePromise,
}) => {
  const [updated, setUpdate] = useState(false)

  useEffect(() => {
    revalidatePromise.then(() => setUpdate(true))
  }, [])

  return (
    <div style={{ color: '#777' }}>
      {!updated ? `Updating cache of ${paths.length} pages...` : 'Cache Updated'}
    </div>
  )
}
