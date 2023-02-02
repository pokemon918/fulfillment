import GlobalStyles from '@/GlobalStyles'
import type { AppContext, AppProps } from 'next/app'
import NextApp from 'next/app'
import 'flag-icons/css/flag-icons.min.css'
import smoothScroll from 'smoothscroll-polyfill'
import NavigatingIndicator from '@/components/NavigatingIndicator'
import { UserProvider } from '@/contexts/userContext'
import useFetchAuthUser from '@/hooks/useFetchAuthUser'
import { getCookie } from '@/utils/cookies'

if (typeof window !== 'undefined') {
  smoothScroll.polyfill()
}

export default function App({
  Component,
  pageProps,
  storedUserString,
}: AppProps & { storedUserString: string | null }) {
  const user = useFetchAuthUser(storedUserString)

  return (
    <UserProvider value={user}>
      <GlobalStyles />

      <NavigatingIndicator />

      <Component {...pageProps} />
    </UserProvider>
  )
}

App.getInitialProps = async (context: AppContext) => {
  const defaultInitialProps = await NextApp.getInitialProps(context)

  const cookies = context.ctx.req?.headers.cookie ?? ''

  return {
    ...defaultInitialProps,
    storedUserString: getCookie(cookies, 'token_user'),
  }
}
