// import '@/styles/globals.css'
import GlobalStyles from '@/GlobalStyles'
import type { AppProps } from 'next/app'
import 'flag-icons/css/flag-icons.min.css'
import smoothScroll from 'smoothscroll-polyfill'

declare global {
  interface Window {
    root: HTMLDivElement
  }
}

if (typeof window !== 'undefined') {
  smoothScroll.polyfill()
  window.root = document.getElementById('__next') as HTMLDivElement
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}
