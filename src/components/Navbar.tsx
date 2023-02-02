import { useUser } from '@/hooks/useUser'
import MenuIcon from '@/icons/MenuIcon'
import theme from '@/theme'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import IconButton from '@/ui/IconButton'
import makeStyles from '@/utils/makeStyles'
import mergeProps from '@/utils/mergeProps'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, HTMLAttributes, useState } from 'react'

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

  const [open, setOpen] = useState(false)

  const toggleOpen = () => setOpen((prevOpen) => !prevOpen)

  const user = useUser()

  return (
    <div css={styles.root} {...divProps} data-open={open}>
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
          {user ? (
            <Link css={styles.userProfile} href="/profile">{user.fullName}</Link>
          ) : (
            <>
              <Button
                css={styles.deskButton}
                variant="outlined"
                rounded
                fontColor={fontColor}
                href="/login"
              >
                Login
              </Button>

              <Button
                css={styles.deskButton}
                rounded
                fontColor={fontColor}
                href="/signup"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        <IconButton css={styles.menuBtn} onClick={toggleOpen}>
          <MenuIcon />
        </IconButton>
      </Container>

      <div css={styles.collapseMenu} data-open={open}>
        <div css={styles.mobileLinks}>
          {links.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              passHref
              css={styles.mobileLink}
              data-active={link.to === pathname}
            >
              {link.title}
            </Link>
          ))}

          {user ? (
            user.fullName
          ) : (
            <>
              <Button
                css={styles.mobileButton}
                variant="outlined"
                rounded
                fontColor={fontColor}
                href="/login"
              >
                Login
              </Button>

              <Button
                css={styles.mobileButton}
                rounded
                fontColor={fontColor}
                href="/signup"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ mode }: NavbarProps) => ({
  root: {
    position: 'relative',
    width: '100%',
    background: mode === 'light' ? '#fff' : undefined,
    boxShadow:
      mode === 'light'
        ? '0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%)'
        : undefined,
    transition: 'opacity 0.25s',
    '&[data-open="true"]': {
      opacity: '1 !important',
    },
    zIndex: 2,
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
  userProfile: {
    color: mode === 'light' ? '#000' : '#fff',
    ':hover': {
      textDecoration: 'underline',
    },
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
    alignItems: 'center',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      display: 'none',
    },
  },
  deskButton: {
    padding: 12,
    minWidth: 116,
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
  collapseMenu: {
    position: 'absolute',
    width: '100%',
    background: mode === 'light' ? '#fff' : '#212121',
    transition: 'height 0.25s',
    overflow: 'hidden',
    height: 0,
    '&[data-open="true"]': {
      height: 314,
      borderBottom: '1px solid #212121',
    },
  },
  mobileLinks: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
    padding: '32px 16px 16px 16px',
  },
  mobileLink: {
    color: mode === 'light' ? '#000' : '#fff',
    marginBottom: 16,
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
    '&[data-active="true"]': {
      color: '#B0D950',
    },
  },
  mobileButton: {
    padding: '12px 8px',
    marginBottom: 16,
  },
}))

export default Navbar
