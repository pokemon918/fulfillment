import { request, RequestDocument, Variables } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import getCookie from './getCookie'

const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL!}/graphql`

const graphqlRequest = <T = any>(
  doc: RequestDocument,
  variables?: Variables,
  requestHeaders?: Dom.RequestInit['headers']
): Promise<T> => {
  const customHeaders: NonNullable<Dom.RequestInit['headers']> = {}

  const token =
    typeof window !== 'undefined'
      ? getCookie(document.cookie, 'token')
      : undefined

  if (typeof token === 'string' && token.length > 0) {
    customHeaders.authorization = `Bearer ${token}`
  }

  return request(endpoint, doc, variables, {
    ...(requestHeaders || {}),
    ...customHeaders,
  })
}

export default graphqlRequest
