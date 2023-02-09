import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { APP_TYPE } from '../constants'

export const TrumarketDocument = () => {
  return (
    <Html lang="en">
      <Head>
        <Script id="wait-user-render" strategy="beforeInteractive">{`
          if (window.localStorage.getItem('${APP_TYPE}_user')) {
            document.documentElement.style.setProperty('--page-display', 0)
            document.documentElement.style.setProperty('--page-bg', '#fff')
          }
        `}</Script>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
