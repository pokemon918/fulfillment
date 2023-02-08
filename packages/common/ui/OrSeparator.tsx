import { makeStyles } from '../utils'
import { FC, HTMLAttributes } from 'react'

interface OrSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

export const OrSeparator: FC<OrSeparatorProps> = (props) => {
  const styles = useStyles(props)

  const { children, ...divProps } = props

  return (
    <div css={styles.root} {...divProps}>
      <div css={styles.separator}></div>
      <div css={styles.text}>or</div>
      <div css={styles.separator}></div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  separator: {
    flexGrow: 1,
    borderBottom: '1px solid #aaa',
  },
  text: {
    color: '#aaa',
    flexShrink: 0,
    padding: '0 12px',
    fontStyle: 'italic',
  },
}))
