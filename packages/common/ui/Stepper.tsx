import { DoneIcon } from '../icons'
import { makeStyles } from '../utils'
import { FC, HTMLAttributes, ReactNode } from 'react'

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  steps: ReactNode[]
  activeStep: Number
}

export const Stepper: FC<StepperProps> = (props) => {
  const styles = useStyles(props)

  const { steps, activeStep, ...divProps } = props

  return (
    <div css={styles.root} {...divProps}>
      {steps.map((step, idx) => {
        const isCompleted = idx < activeStep
        const isLast = idx + 1 === steps.length

        return (
          <div css={styles.step} key={idx}>
            {isCompleted && !isLast && <div css={styles.connector} />}

            <span css={styles.stepLabel} data-completed={isCompleted}>
              {isCompleted ? <DoneIcon style={{ fontSize: 20 }} /> : idx + 1}
            </span>

            {step}
          </div>
        )
      })}
    </div>
  )
}

const useStyles = makeStyles(({}: StepperProps) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  step: {
    position: 'relative',
  },
  stepLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'inline-flex',
    width: 30,
    height: 30,
    border: '1px solid #B1DA50',
    background: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    lineHeight: 0,
    fontWeight: 500,
    '&[data-completed="true"]': {
      background: '#B1DA50',
    },
  },
  connector: {
    position: 'absolute',
    top: 0,
    height: '100%',
    borderLeft: '1px solid #B1DA50',
    left: 14,
  },
}))
