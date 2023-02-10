import { makeStyles } from '../utils'
import NextLink from 'next/link'
import { FC, HTMLAttributes } from 'react'

interface StyledLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  native?: boolean
  href: string
}

export const StyledLink: FC<StyledLinkProps> = (props) => {
  const styles = useStyles(props)

  const { native, ...anchorProps} = props
  
  const Link = native ? 'a' : NextLink

  return <Link css={styles.root} {...anchorProps} />
}

const useStyles = makeStyles(() => ({
  root: {
    textDecoration: 'underline',
    color: 'rgb(29, 78, 216)',
  },
}))
