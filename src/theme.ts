import { Inter } from '@next/font/google'
import localFont from '@next/font/local'

const primary = Inter({
  subsets: ['latin'],
})

const secondary = localFont({
  src: [
    {
      path: '../public/fonts/graphik/graphik-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/graphik/graphik-semibold.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/graphik/graphik-bold.otf',
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

const theme = {
  fonts: {
    primary: primary.style.fontFamily,
    secondary: secondary.style.fontFamily,
  },
  widths: {
    tablet: new Width(992),
  },
}

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.theme = theme
}

export default theme
