import { makeStyles } from '../utils'
import { FC, HTMLAttributes } from 'react'
import { theme } from '../theme'

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  bordered?: boolean
}

export const IconButton: FC<IconButtonProps> = (props) => {
  const styles = useStyles(props)

  const { children, bordered, ...btnProps } = props

  return (
    <button css={styles.root} {...btnProps}>
      {children}
    </button>
  )
}

const useStyles = makeStyles(({ bordered }: IconButtonProps) => ({
  root: {
    border: bordered ? '3px solid #3BA83B' : 'none',
    height: bordered ? 50 : 40,
    width: bordered ? 50 : 40,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    background: 'transparent',
    cursor: 'pointer',
    color: '#3BA83B',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      border: bordered ? '3px solid #3BA83B' : 'none',
      height: bordered ? 42 : 40,
      width: bordered ? 42 : 40,
    },
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      border: bordered ? '3px solid #3BA83B' : 'none',
      height: bordered ? 37 : 35,
      width: bordered ? 37 : 35,
    },
  },
}))
