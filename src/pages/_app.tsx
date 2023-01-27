// import '@/styles/globals.css'
import GlobalStyles from '@/theme/GlobalStyles'
import type { AppProps } from 'next/app'
import 'flag-icons/css/flag-icons.min.css'
import smoothScroll from 'smoothscroll-polyfill';

if (typeof window !== 'undefined') {
  smoothScroll.polyfill()
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}
