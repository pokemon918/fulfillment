import fonts from '@/theme/fonts'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import makeStyles from '@/utils/makeStyles'
import mergeProps from '@/utils/mergeProps'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
  fontColor?: 'black' | 'white'
}

const links: {
  title: string
  to: string
}[] = [
  {
    title: 'Home',
    to: '/',
  },
  {
    title: 'Technology',
    to: '/technology',
  },
  {
    title: 'Who We Are',
    to: '/who-we-are',
  },
  {
    title: 'Contact us',
    to: '/contact-us',
  },
]

const Navbar: FC<NavbarProps> = (originalProps) => {
  const props = mergeProps(originalProps, {
    fontColor: 'black',
  })

  const styles = useStyles(props)

  const { fontColor, ...divProps } = props

  const fontColorHex = fontColor === 'black' ? '#000' : '#fff'

  return (
    <div css={styles.root} {...divProps}>
      <Container css={styles.nav}>
        <Link href="/">
          <img
            src={`/trumarket-logo-${fontColor}.svg`}
            style={{ height: 90 }}
          />
        </Link>

        <div>
          {links.map((link) => (
            <Link key={link.to} href={link.to} passHref css={styles.link}>
              {link.title}
            </Link>
          ))}
        </div>

        <div css={styles.buttons}>
          <Button
            css={styles.button}
            variant="outlined"
            size="lg"
            rounded
            fontColor={fontColorHex}
          >
            Invest Now
          </Button>

          <Button
            css={styles.button}
            size="lg"
            rounded
            fontColor={fontColorHex}
          >
            Fulfillment
          </Button>
        </div>
      </Container>
    </div>
  )
}

const useStyles = makeStyles(({ fontColor }: NavbarProps) => {
  const fontColorHex = fontColor === 'black' ? '#000' : '#fff'

  return {
    root: {
      width: '100%',
      background: fontColor === 'black' ? '#fff' : undefined,
      boxShadow:
        fontColor === 'black'
          ? '0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%)'
          : undefined,
    },
    nav: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '6px 24px',
    },
    link: {
      color: fontColorHex,
      fontFamily: fonts.secondary.style.fontFamily,
      textDecoration: 'none',

      '&:not(:last-of-type)': {
        marginRight: 46,
      },
    },
    buttons: {
      display: 'flex',
    },
    button: {
      '&:not(:last-of-type)': {
        marginRight: 16,
      },
    },
  }
})

export default Navbar
