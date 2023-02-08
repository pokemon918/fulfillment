import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>
          TRU MARKET - Trust, transparency & traceability in agro market
        </title>

        <link rel="icon" href="/favicon.ico" />

        <Script id="wait-user-render" strategy="beforeInteractive">{`
          if (window.localStorage.getItem('fulfillment_user')) {
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
