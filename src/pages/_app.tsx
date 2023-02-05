import GlobalStyles from '@/GlobalStyles'
import type { AppProps } from 'next/app'
import 'flag-icons/css/flag-icons.min.css'
import smoothScroll from 'smoothscroll-polyfill'
import NavigatingIndicator from '@/components/NavigatingIndicator'
import { UserProvider } from '@/contexts/userContext'
import useFetchAuthUser from '@/hooks/useFetchAuthUser'
import Head from 'next/head'

if (typeof window !== 'undefined') {
  smoothScroll.polyfill()
}

export default function App({
  Component,
  pageProps,
}: AppProps & { storedUserString: string | null }) {
  const user = useFetchAuthUser()

  if (typeof user === 'undefined') return null

  return (
    <>
      <Head>
        <title>
          TRU MARKET - Trust, transparency & traceability in agro market
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <UserProvider value={user}>
        <GlobalStyles />

        <NavigatingIndicator />

        <Component {...pageProps} />
      </UserProvider>
    </>
  )
}
