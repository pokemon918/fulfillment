import { makeStyles } from '../utils'
import { FC, HTMLAttributes } from 'react'

interface PaperProps extends HTMLAttributes<HTMLDivElement> {
  bordered?: boolean
}

export const Paper: FC<PaperProps> = (props) => {
  const styles = useStyles(props)

  return <div css={styles.root} {...props} />
}

const useStyles = makeStyles(({ bordered }: PaperProps) => ({
  root: {
    boxShadow:
      'rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0) 0 0 0 0, ' +
      'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0, 0, 0, 0.1) 0 2px 4px -2px',
    backgroundColor: '#fff',
    borderRadius: '0.25rem',
    padding: '1.5rem',
  },
}))
