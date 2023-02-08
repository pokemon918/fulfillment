import { theme } from '../theme'
import { makeStyles } from '../utils'
import { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react'

interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  dialogClassName?: string
  dialogStyle?: CSSProperties
  children: ReactNode
}

export const Dialog: FC<DialogProps> = (props) => {
  const styles = useStyles(props)

  const { dialogClassName, dialogStyle, ...divProps } = props

  return (
    <div css={styles.backdrop} className={dialogClassName} style={dialogStyle}>
      <div css={styles.dialog} {...divProps} />
    </div>
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
    zIndex: 256,
  },
  dialog: {
    width: 'calc(100% - 2rem)',
    height: 'calc(100% - 2rem)',
    maxWidth: '1000px',
    maxHeight: '600px',
    borderRadius: 4,
    overflow: 'auto',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      maxHeight: 'initial',
      maxWidth: 'initial',
    },
    [`@media (max-width: ${theme.widths.mobile})`]: {
      width: '100%',
      height: '100%',
      borderRadius: 0,
    },
  },
}))
