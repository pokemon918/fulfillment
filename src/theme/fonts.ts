import { Inter } from '@next/font/google'
import localFont from '@next/font/local'

const primary = Inter({  
  subsets: ['latin'],
})

const secondary = localFont({
  src: [
    {
      path: '../../public/fonts/graphik/graphik-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/graphik/graphik-semibold.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/graphik/graphik-bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
})

const fonts = {
  primary,
  secondary,
}

export default fonts
