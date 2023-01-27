import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes } from 'react'

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const IconButton: FC<IconButtonProps> = (props) => {
  const styles = useStyles(props)

  const { children, ...btnProps } = props

  return (
    <button css={styles.root} {...btnProps}>
      {children}
    </button>
  )
}

const useStyles = makeStyles(({}: IconButtonProps) => ({
  root: {
    border: '2px solid #000000',
    height: 42,
    width: 42,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    background: 'transparent',
    cursor: 'pointer'
  },
}))

export default IconButton
