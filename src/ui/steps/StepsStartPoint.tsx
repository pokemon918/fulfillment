import makeStyles from '@/utils/makeStyles'
import { FC } from 'react'

interface StepsStartPointProps {}

const StepsStartPoint: FC<StepsStartPointProps> = (props) => {
  const styles = useStyles(props)

  return <div css={styles.root} {...props} />
}

const useStyles = makeStyles(({}: StepsStartPointProps) => ({
  root: {
    position: 'relative',
    height: 100,
    '::after': {
      content: '""',
      position: 'absolute',
      height: 16,
      width: 16,
      background: '#B1DA50',
      borderRadius: '50%',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    '::before': {
      content: '""',
      position: 'absolute',
      width: 1,
      height: '100%',
      background: '#B1DA50',
      top: 0,
      left: 'calc(50% - 0.5px)',
      zIndex: -1,
    },
  },
}))

export default StepsStartPoint
