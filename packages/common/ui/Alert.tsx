import { makeStyles } from '../utils'
import { FC, HTMLAttributes } from 'react'

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  severity: 'error' | 'success'
}

export const Alert: FC<AlertProps> = (props) => {
  const styles = useStyles(props)

  const { children, ...divProps } = props

  return (
    <div css={styles.root} role="alert" {...divProps}>
      {children}
    </div>
  )
}

const colors = {
  error: {
    backgroundColor: 'rgb(254, 226, 226)',
    borderColor: 'rgb(248, 113, 113)',
    color: 'rgb(185, 28, 28)',
  },
  success: {
    backgroundColor: 'rgb(204, 251, 241)',
    borderColor: 'rgb(45, 212, 191)',
    color: 'rgb(15, 118, 110)',
  },
}

const useStyles = makeStyles(({ severity }: AlertProps) => ({
  root: {
    display: 'block',
    padding: '12px 16px',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    ...colors[severity],
  },
}))
