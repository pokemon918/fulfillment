import { request, RequestDocument, Variables } from 'graphql-request'
import { getCookie } from 'cookies-next'

const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL!}/graphql`

const graphqlReq = <T = any>(
  doc: RequestDocument,
  variables?: Variables,
  requestHeaders?: Record<string, string>
): Promise<T> => {
  const customHeaders: Record<string, string> = {}

  const token = getCookie('token')

  if (typeof token === 'string' && token.length > 0) {
    customHeaders.authorization = `Bearer ${token}`
  }

  return request(endpoint, doc, variables, {
    ...(requestHeaders || {}),
    ...customHeaders,
  })
}

export const isGqlErrStatus = (err: any, statusCode: number) => {
  if (err && err.response && err.response.errors instanceof Array) {
    return err.response.errors.some(
      (e: any) =>
        e &&
        e.extensions &&
        e.extensions.response &&
        e.extensions.response.statusCode === statusCode
    )
  }

  return false
}

export default graphqlReq
