import { theme } from '../../theme'
import { makeStyles } from '../../utils'
import { FC } from 'react'
import { Step } from './Step'
import { StepGallery } from './StepGallery'
import { StepsStartPoint } from './StepsStartPoint'
import parseLineBreaks from '../../utils/parseLineBreaks'

interface StepsProps {
  steps: {
    title: string
    description: string
    gallery: string[]
  }[]
}

export const Steps: FC<StepsProps> = (props) => {
  const styles = useStyles(props)

  const { steps } = props

  return (
    <div>
      <div css={styles.deskSteps}>
        <StepsStartPoint />

        {steps.map((step, stepIdx) => (
          <Step
            key={stepIdx}
            {...step}
            stepNum={('0' + (stepIdx + 1)).slice(-2)}
            reversed={stepIdx % 2 == 1}
            bottomSpace={80}
            verticalConnect={stepIdx + 1 < steps.length}
          />
        ))}
      </div>

      <div css={styles.mobileSteps}>
        {steps.map((step, stepIdx) => {
          return (
            <div css={styles.step} key={stepIdx}>
              <div css={styles.stepHeader}>
                <span css={styles.stepNum}>
                  {('0' + (stepIdx + 1)).slice(-2)}
                </span>
                <h3 css={styles.heading}>{step.title}</h3>
              </div>

              <div css={styles.desc}>{parseLineBreaks(step.description)}</div>

              <div css={styles.gallery} data-reversed={stepIdx % 2 == 0}>
                <StepGallery gallery={step.gallery} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({}: StepsProps) => {
  return {
    deskSteps: {
      display: 'block',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        display: 'none',
      },
    },
    mobileSteps: {
      display: 'none',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        display: 'block',
      },
    },
    stepHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 20,
    },
    heading: {
      fontSize: 20,
      fontWeight: 700,
    },
    stepNum: {
      position: 'relative',
      width: 40,
      height: 40,
      background: '#B1DA50',
      color: '#fff',
      fontSize: 18,
      fontWeight: 700,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      lineHeight: 0,
      marginRight: 16,
    },
    step: {
      ':not(:last-of-type)': {
        marginBottom: 80,
      },
    },
    desc: {
      marginBottom: 30,
    },
    gallery: {},
  }
})
