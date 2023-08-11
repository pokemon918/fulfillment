import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { FC, HTMLAttributes, useEffect, useMemo, useRef, useState } from 'react'
import { useSameState, useUser } from '../hooks'
import { MenuIcon } from '../icons'
import { theme } from '../theme'
import { Button, Container, IconButton } from '../ui'
import { makeStyles, mergeProps } from '../utils'
import logoLight from '../assets/images/logo-light.svg'
import logoDark from '../assets/images/logo-dark.svg'

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
  mode?: 'light' | 'dark'
}

const staticLinks: {
  title: string
  to: string
}[] = [
  {
    title: 'Home',
    to: '/',
  },
  {
    title: 'Technology',
    to: 'https://trumarket.tech/technology',
  },
  {
    title: 'Who We Are',
    to: 'https://trumarket.tech/whoweare',
  },
  {
    title: 'Contact us',
    to: 'https://trumarket.tech/contactus',
  },
]

export const Navbar: FC<NavbarProps> = (originalProps) => {
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

  const links = useMemo(() => {
    const result = [...staticLinks]
    if (user?.role === 'admin') {
      result.push({ title: 'Users', to: '/users' })
      result.push({ title: 'Investments', to: '/investments' })
    }
    return result
  }, [user])

  const collapseRef = useRef<HTMLDivElement>(null)
  const [collapseHeight, setCollapseHeight] = useSameState(0)

  useEffect(() => {
    const setHeight = () => setCollapseHeight(collapseRef.current!.scrollHeight)

    setHeight()

    window.addEventListener('resize', setHeight, { passive: true })
    return () => window.removeEventListener('resize', setHeight)
  }, [])

  const logo = mode === 'light' ? logoLight : logoDark

  const Link = user?.role === 'admin' ? 'a' : NextLink

  return (
    <div css={styles.root} {...divProps} data-open={open}>
      <Container css={styles.nav}>
        <div css={styles.logoWrapper}>
          <Link href="/">
            <img src={logo.src} css={styles.logo} />
          </Link>
        </div>

        <div css={styles.deskLinks}>
          {links.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              css={styles.deskLink}
              data-active={link.to === pathname}
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div css={styles.deskButtons}>
          {user ? (
            <Link css={styles.userProfile} href="/profile">
              {user.fullName}
            </Link>
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

      <div
        css={styles.collapseMenu}
        data-open={open}
        style={{
          height: open ? collapseHeight : 0,
        }}
      >
        <div ref={collapseRef} css={styles.mobileLinks}>
          {links.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              css={styles.mobileLink}
              data-active={link.to === pathname}
            >
              {link.title}
            </Link>
          ))}

          {user ? (
            <Link css={styles.userProfile} href="/profile">
              {user.fullName}
            </Link>
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
    padding: '6px 16px',
  },
  nav: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 88,
    padding: 0,
    color: mode === 'light' ? '#000' : '#fff',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      justifyContent: 'space-between',
      height: 'initial',
      position: 'static',
    },
  },
  logoWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      position: 'static',
      height: 'initial',
      display: 'block',
    },
  },
  logo: {
    height: 70,
    [`@media (max-width: ${theme.widths.tablet})`]: {
      height: 55,
    },
  },
  userProfile: {
    color: mode === 'light' ? '#000' : '#fff',
    textDecoration: 'none',
  },
  deskLinks: {
    flexShrink: 0,
    [`@media (max-width: ${theme.widths.tablet})`]: {
      display: 'none',
    },
  },
  deskLink: {
    position: 'relative',
    color: 'inherit',
    fontFamily: theme.fonts.primary,
    textDecoration: 'none',
    ':hover': {
      color: '#B0D950',
    },
    ':not(:last-of-type)': {
      marginRight: 46,
      '@media (max-width: 1110px)': {
        marginRight: 30,
      },
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
        bottom: -10,
        left: 'calc(50% - 3px)',
      },
    },
  },
  deskButtons: {
    display: 'flex',
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    flexShrink: 0,
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
    display: 'none',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      display: 'block',
      position: 'absolute',
      width: '100%',
      background: mode === 'light' ? '#fff' : '#212121',
      transition: 'height 0.25s',
      overflow: 'hidden',
      height: 0,
      left: 0,
      '&[data-open="true"]': {
        borderBottom: '1px solid #212121',
      },
    },
  },
  mobileLinks: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
    padding: '32px 16px',
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
    ':not(:last-of-type)': {
      marginBottom: 16,
    },
  },
}))
