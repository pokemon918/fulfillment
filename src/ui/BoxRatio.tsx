import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes } from 'react'

interface BoxRationProps extends HTMLAttributes<HTMLDivElement> {
  ration: number
}

const BoxRation: FC<BoxRationProps> = (props) => {
  const styles = useStyles(props)

  const { children, ration, ...divProps } = props

  return (
    <div css={styles.root} {...divProps}>
      <div css={styles.content}>{children}</div>
    </div>
  )
}

const useStyles = makeStyles(({ ration }: BoxRationProps) => ({
  root: {
    position: 'relative',
    width: '100%',
    '::before': {
      content: '""',
      display: 'block',
      width: '100%',
      paddingTop: `${ration * 100}%`,
    },
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}))

export default BoxRation
