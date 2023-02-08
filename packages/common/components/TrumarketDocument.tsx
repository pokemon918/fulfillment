
import { Html, Head, Main, NextScript } from 'next/document'
import { WaitUserRender } from '../scripts'

export function TrumarketDocument() {
  return (
    <Html lang="en">
      <Head>
        <WaitUserRender />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
