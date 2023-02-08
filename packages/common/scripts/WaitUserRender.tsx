import Script from 'next/script'

export const WaitUserRender = () => (
  <Script id="wait-user-render" strategy="beforeInteractive">{`
    if (window.localStorage.getItem('fulfillment_user')) {
      document.documentElement.style.setProperty('--page-display', 0)
      document.documentElement.style.setProperty('--page-bg', '#fff')
    }
  `}</Script>
)
