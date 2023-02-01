import GlobalStyles from '@/GlobalStyles'
import type { AppContext, AppProps } from 'next/app'
import NextApp from 'next/app'
import 'flag-icons/css/flag-icons.min.css'
import smoothScroll from 'smoothscroll-polyfill'
import NavigatingIndicator from '@/components/NavigatingIndicator'
import { BasicUser } from '@/types/user'
import { UserProvider } from '@/contexts/userContext'
import { gql } from 'graphql-request'
import graphqlReq from '@/utils/graphqlReq'
import { deleteCookie, getCookie } from 'cookies-next'

if (typeof window !== 'undefined') {
  smoothScroll.polyfill()
}

export default function App({
  Component,
  pageProps,
  user,
}: AppProps & { user: BasicUser | null }) {
  return (
    <UserProvider value={user}>
      <GlobalStyles />

      <NavigatingIndicator />

      <Component {...pageProps} />
    </UserProvider>
  )
}

const GET_AUTH_USER = gql`
  {
    user: userProfile {
      _id
      fullName
      role
    }
  }
`

App.getInitialProps = async (context: AppContext) => {
  const defaultInitialProps = await NextApp.getInitialProps(context)

  const { req, res } = context.ctx

  let user = null

  if (req && res) {
    const token = getCookie('token', { req, res })

    try {
      if (token) {
        user = (
          await graphqlReq(
            GET_AUTH_USER,
            {},
            { authorization: `Bearer ${token}` }
          )
        ).user

        if (!user) {
          deleteCookie('token', { req, res })
        }
      }
    } catch {}
  }

  return {
    ...defaultInitialProps,
    user,
  }
}
