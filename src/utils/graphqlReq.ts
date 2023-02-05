import { request, RequestDocument, Variables } from 'graphql-request'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { getCookie } from './cookies'

const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL!}/graphql`

const graphqlReq = <T = any>(
  doc: RequestDocument,
  variables?: Variables,
  requestHeaders?: Record<string, string>,
  tokenInput?: string | null
): Promise<T> => {
  const customHeaders: Record<string, string> = {}

  const token =
    typeof window !== 'undefined' ? getCookie(document.cookie, 'token') : null

  if (typeof token === 'string' && token.length > 0) {
    customHeaders.authorization = `Bearer ${token}`
  }

  if (tokenInput) {
    customHeaders.authorization = `Bearer ${tokenInput}`
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

export const graphqlServerReq = <T = any>(
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  doc: RequestDocument,
  variables?: Variables,
  requestHeaders?: Record<string, string>
): Promise<T> => {
  const cookies = ctx.req.headers.cookie ?? ''
  const token = getCookie(cookies, 'token')
  return graphqlReq(doc, variables, requestHeaders, token)
}

export default graphqlReq
