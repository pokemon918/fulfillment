import GoogleIcon from '@/icons/GoogleIcon'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes } from 'react'

interface GoogleAuthButtonProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string
}

const GoogleAuthButton: FC<GoogleAuthButtonProps> = (props) => {
  const styles = useStyles(props)

  const { children, ...anchorProps } = props

  return (
    <a css={styles.root} {...anchorProps}>
      <GoogleIcon style={{ marginRight: 8 }} className="mr-2" />
      <span>Continue with Google</span>
    </a>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    transitionProperty:
      'color, background-color, border-color, text-decoration-color, fill, stroke',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '150ms',

    fontWeight: 600,

    fontSize: '0.875rem',
    lineHeight: '1.25rem',

    padding: '0.5rem 1rem',

    backgroundColor: 'rgb(249 250 251)',

    border: '1px solid rgb(209 213 219)',

    borderRadius: '0.25rem',

    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    width: '100%',
    display: 'flex',
    color: 'inherit',
    textDecoration: 'inherit',
  },
}))

export default GoogleAuthButton
