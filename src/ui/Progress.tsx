import { FC, HTMLAttributes } from 'react'
import makeStyles from '@/utils/makeStyles'

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number
}

const Progress: FC<ProgressProps> = (props) => {
  const styles = useStyles(props)
  
  const { value, ...divProps } = props

  return (
    <div css={styles.root} {...divProps}>
      <div
        css={styles.bar}
        style={{
          width: `${value}%`,
        }}
      />
    </div>
  )
}

const useStyles = makeStyles((props: ProgressProps) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 4,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#aaa'
  },
  bar: {
    position: 'absolute',
    left: 0,
    width: 0,
    height: '100%',
    transition: '0.5s',
    zIndex: 1,
    backgroundColor: 'var(--color-primary)'
  }
}))

export default Progress
