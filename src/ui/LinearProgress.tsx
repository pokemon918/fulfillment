import makeStyles from '@/utils/makeStyles'
import { keyframes } from '@emotion/react'
import { FC, HTMLAttributes } from 'react'

interface LinearProgressProps extends HTMLAttributes<HTMLDivElement> {
  fixed?: boolean
}

const LinearProgress: FC<LinearProgressProps> = (props) => {
  const styles = useStyles(props)

  const { fixed, ...divProps } = props

  return (
    <div css={styles.root} data-fixed={fixed} {...divProps}>
      <div css={styles.bar1}></div>
      <div css={styles.bar2}></div>
    </div>
  )
}

const bar1Animation = keyframes`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`

const bar2Animation = keyframes`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`

const useStyles = makeStyles(({}: LinearProgressProps) => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
    display: 'block',
    height: 4,
    width: '100%',
    zIndex: 0,
    backgroundColor: '#d9edab',
    '&[data-fixed="true"]': {
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 612,
    },
  },
  bar1: {
    width: 'auto',
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    transition: 'transform 0.2s linear',
    transformOrigin: 'left',
    backgroundColor: '#b0d950',
    animation: `${bar1Animation} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`,
  },
  bar2: {
    width: 'auto',
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    transition: 'transform 0.2s linear',
    transformOrigin: 'left',
    backgroundColor: '#b0d950',
    animation: `${bar2Animation} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite`
  }
}))

export default LinearProgress
