import type { AppProps } from 'next/app'
import Head from 'next/head'

import 'flag-icons/css/flag-icons.min.css'
import smoothScroll from 'smoothscroll-polyfill'
import { useFetchAuthUser } from '../hooks'
import { UserProvider } from '../contexts'
import { GlobalStyles } from '../GlobalStyles'
import { NavigatingIndicator } from './NavigatingIndicator'

if (typeof window !== 'undefined') {
  smoothScroll.polyfill()
}

export function TrumarketApp({ Component, pageProps }: AppProps) {
  const user = useFetchAuthUser()

  const appRootWrapperStyles =
    typeof user === 'undefined'
      ? {
          background: 'var(--page-bg, transparent)',
        }
      : undefined

  const appRootStyles =
    typeof user === 'undefined'
      ? {
          opacity: 'var(--page-display, 1)',
        }
      : undefined

  return (
    <>
      <Head>
        <title>
          TRU MARKET - Trust, transparency & traceability in agro market
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="app-root-wrapper" style={appRootWrapperStyles}>
        <div className="app-root" style={appRootStyles}>
          <UserProvider value={user}>
            <GlobalStyles />

            <NavigatingIndicator />

            <Component {...pageProps} />
          </UserProvider>
        </div>
      </div>
    </>
  )
}
