import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes } from 'react'

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  bordered?: boolean
}

const IconButton: FC<IconButtonProps> = (props) => {
  const styles = useStyles(props)

  const { children, ...btnProps } = props

  return (
    <button css={styles.root} {...btnProps}>
      {children}
    </button>
  )
}

const useStyles = makeStyles(({ bordered }: IconButtonProps) => ({
  root: {
    border: bordered ? '2px solid #000000' : 'none',
    height: bordered ? 42 : 40,
    width: bordered ? 42 : 40,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    background: 'transparent',
    cursor: 'pointer',
    color: 'inherit'
  },
}))

export default IconButton
