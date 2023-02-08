import { makeStyles } from '../utils'
import { keyframes } from '@emotion/react'
import { FC, HTMLAttributes } from 'react'

interface CircularProgressProps extends HTMLAttributes<HTMLSpanElement> {
  size?: number
}

export const CircularProgress: FC<CircularProgressProps> = (props) => {
  const styles = useStyles(props)

  const { ...spanProps } = props

  return (
    <span css={styles.root} role="progressbar" {...spanProps}>
      <svg css={styles.svg} viewBox="22 22 44 44">
        <circle
          css={styles.circle}
          cx="44"
          cy="44"
          r="20.2"
          fill="none"
          strokeWidth="3.6"
        ></circle>
      </svg>
    </span>
  )
}

const rootKeyframes = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const circleKeyframes = keyframes`
  0% {
    stroke-dasharray: 1px,200px;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100px,200px;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 100px,200px;
    stroke-dashoffset: -125px;
  }
`

const useStyles = makeStyles(({ size = 40 }: CircularProgressProps) => ({
  root: {
    width: size,
    height: size,
    display: 'inline-block',
    color: '#69832c',
    animation: `${rootKeyframes} 1.4s linear infinite`,
  },
  svg: {
    display: 'block',
  },
  circle: {
    stroke: 'currentColor',
    strokeDasharray: '80px, 200px',
    strokeDashoffset: 0,
    animation: `${circleKeyframes} 1.4s ease-in-out infinite`,
  },
}))
