import GlobalStyles from '@/GlobalStyles'
import type { AppProps } from 'next/app'
import 'flag-icons/css/flag-icons.min.css'
import smoothScroll from 'smoothscroll-polyfill'
import NavigatingIndicator from '@/components/NavigatingIndicator'
import { UserProvider } from '@/contexts/userContext'
import useFetchAuthUser from '@/hooks/useFetchAuthUser'
import Head from 'next/head'
import Script from 'next/script'

if (typeof window !== 'undefined') {
  smoothScroll.polyfill()
}

export default function App({ Component, pageProps }: AppProps) {
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

      <Script id="my-script" strategy="beforeInteractive">{`
        if (window.localStorage.getItem('fulfillment_user')) {
          document.documentElement.style.setProperty('--page-display', 0)
          document.documentElement.style.setProperty('--page-bg', '#fff')
        }
      `}</Script>

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
