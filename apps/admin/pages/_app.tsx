import 'common/initApp'
import '@/styles/globals.css'
import '@/styles/data-tables-css.css'
import '@/styles/satoshi.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { RootLayout } from "@/components/Layout";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useFetchAuthUser, UserProvider, GlobalStyles } from 'common'

const TrumarketApp = ({ Component, pageProps }: AppProps) => {
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
            <ToastContainer position="top-center" theme="dark" />
            <RootLayout>
                <Component {...pageProps} />
            </RootLayout>
          </UserProvider>
        </div>
      </div>
    </>
  )
}

export default TrumarketApp