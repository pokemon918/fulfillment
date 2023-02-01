import makeStyles from '@/utils/makeStyles'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'

interface StyledLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string
}

const StyledLink: FC<StyledLinkProps> = (props) => {
  const styles = useStyles(props)

  return <Link css={styles.root} {...props} />
}

const useStyles = makeStyles(() => ({
  root: {
    textDecoration: 'underline',
    color: 'rgb(29, 78, 216)',
  },
}))

export default StyledLink
