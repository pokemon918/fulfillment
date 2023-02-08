import { RequestDocument, Variables } from 'graphql-request'
import { useEffect, useRef, useState } from 'react'
import { graphqlReq } from '../utils'

export const useGql = <D extends unknown, E extends unknown = unknown>(
  document: RequestDocument,
  variables?: Variables,
  isReady: boolean = true,
  transform?: (data: D) => D
): { data?: D; err?: E } => {
  const [data, setData] = useState<D>()
  const [err, setErr] = useState<E>()
  const isRequested = useRef(false)

  useEffect(() => {
    if (isReady && !isRequested.current) {
      ;(async () => {
        try {
          const resData = (await graphqlReq(document, variables)) as D

          setData(transform ? transform(resData) : resData)
        } catch (e) {
          setErr(e as E)
        }
      })()

      isRequested.current = true
    }
  }, [isReady])

  return {
    data,
    err,
  }
}
