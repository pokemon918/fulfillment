import { Inter } from '@next/font/google'
import localFont from '@next/font/local'

const primary = Inter({
  subsets: ['latin'],
})

const secondary = localFont({
  src: [
    {
      path: './fonts/graphik/graphik-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/graphik/graphik-semibold.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/graphik/graphik-bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
})

class Width {
  constructor(public value: number) {}

  toString() {
    return this.value + 'px'
  }
}

export const theme = {
  fonts: {
    primary: primary.style.fontFamily,
    secondary: secondary.style.fontFamily,
  },
  widths: {
    tablet: new Width(992),
    tabletSm: new Width(768),
    tabletXs: new Width(520),
    mobile: new Width(480),
    mobileSm: new Width(380),
    mobileXs: new Width(320),
  },
}

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.theme = theme
}

