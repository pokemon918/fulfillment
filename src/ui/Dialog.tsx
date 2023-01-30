import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes, ReactNode } from 'react'
import Portal from '../components/Portal'

interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const Dialog: FC<DialogProps> = (props) => {
  const styles = useStyles(props)

  return (
    <Portal>
      <div css={styles.backdrop}>
        <div css={styles.dialog} {...props} />
      </div>
    </Portal>
  )
}

const useStyles = makeStyles(({}: DialogProps) => ({
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    width: 'calc(100% - 3rem)',
    height: 'calc(100% - 3rem)',
    maxWidth: '1000px',
    maxHeight: '600px',
    borderRadius: 4,
    overflow: 'auto'
  },
}))

export default Dialog
