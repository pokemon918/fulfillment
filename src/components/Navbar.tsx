import MenuIcon from '@/icons/MenuIcon'
import theme from '@/theme'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import IconButton from '@/ui/IconButton'
import makeStyles from '@/utils/makeStyles'
import mergeProps from '@/utils/mergeProps'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, HTMLAttributes } from 'react'

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
  mode?: 'light' | 'dark'
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
    mode: 'light',
  })

  const styles = useStyles(props)

  const { mode, ...divProps } = props

  const fontColor = mode === 'light' ? '#000' : '#fff'

  const { pathname } = useRouter()

  return (
    <div css={styles.root} {...divProps}>
      <Container css={styles.nav}>
        <Link href="/">
          <img src={`/trumarket-logo-${mode}.svg`} css={styles.logo} />
        </Link>

        <div css={styles.deskLinks}>
          {links.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              passHref
              css={styles.deskLink}
              data-active={link.to === pathname}
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div css={styles.deskButtons}>
          <Button
            css={styles.deskButton}
            variant="outlined"
            size="lg"
            rounded
            fontColor={fontColor}
          >
            Invest Now
          </Button>

          <Button
            css={styles.deskButton}
            size="lg"
            rounded
            fontColor={fontColor}
          >
            Fulfillment
          </Button>
        </div>

        <IconButton css={styles.menuBtn}>
          <MenuIcon />
        </IconButton>
      </Container>
    </div>
  )
}

const useStyles = makeStyles(({ mode }: NavbarProps) => ({
  root: {
    width: '100%',
    background: mode === 'light' ? '#fff' : undefined,
    boxShadow:
      mode === 'light'
        ? '0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%)'
        : undefined,
  },
  logo: {
    height: 70,
    [`@media (max-width: ${theme.widths.tablet})`]: {
      height: 55,
    },
  },
  nav: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6px 16px',
    color: mode === 'light' ? '#000' : '#fff',
  },
  deskLinks: {
    display: 'flex',
    maxWidth: 450 + 64,
    width: '100%',
    justifyContent: 'space-between',
    padding: '0 32px',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      display: 'none',
    },
  },
  deskLink: {
    position: 'relative',
    color: 'inherit',
    fontFamily: theme.fonts.secondary,
    textDecoration: 'none',
    ':hover': {
      color: '#B0D950',
    },
    '&[data-active="true"]': {
      color: '#B0D950',
      '::after': {
        content: '""',
        position: 'absolute',
        width: 6,
        height: 6,
        background: '#B0D950',
        borderRadius: '50%',
        bottom: -6,
        left: 'calc(50% - 3px)',
      },
    },
  },
  deskButtons: {
    display: 'flex',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      display: 'none',
    },
  },
  deskButton: {
    '&:not(:last-of-type)': {
      marginRight: 16,
    },
  },
  menuBtn: {
    display: 'none',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      display: 'inline-flex',
    },
  },
}))

export default Navbar
