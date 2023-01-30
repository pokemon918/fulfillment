import makeStyles from '@/utils/makeStyles'
import { FC, ReactNode } from 'react'
import Step from './Step'

interface StepsProps {
  steps: {
    title: string
    description: string
    gallery: string[]
  }[]
}

const Steps: FC<StepsProps> = (props) => {
  const styles = useStyles(props)

  const { steps } = props

  return (
    <div css={styles.root}>
      <div css={styles.startPoint} />
      {steps.map((step, stepIdx) => {
        const galleryNode = (
          <div css={styles.gallery}>
            {step.gallery.map((galleryItem, idx) => {
              let isVideo = ['webm', 'mp4'].includes(
                galleryItem.split('.').at(-1) as any
              )

              if (isVideo) {
                return (
                  <video
                    key={galleryItem + idx}
                    css={
                      step.gallery.length > 1
                        ? styles.smCircleImg
                        : styles.lgCircleImg
                    }
                    width="320"
                    height="240"
                    controls
                    src={galleryItem}
                  />
                )
              }

              return (
                <img
                  key={galleryItem + idx}
                  style={{ marginRight: 12 }}
                  css={
                    step.gallery.length > 1
                      ? styles.smCircleImg
                      : styles.lgCircleImg
                  }
                  src={galleryItem}
                  alt=""
                />
              )
            })}
          </div>
        )

        return (
          <Step
            key={stepIdx}
            css={styles.step}
            title={step.title}
            desc={step.description}
            gallery={galleryNode}
            stepNum={('0' + (stepIdx + 1)).slice(-2)}
            reversed={stepIdx % 2 == 1}
            bottomSpace={80}
            verticalConnect={stepIdx + 1 < steps.length}
          />
        )
      })}
    </div>
  )
}

const useStyles = makeStyles(({}: StepsProps) => {
  const circle = {
    borderRadius: '50%',
    background: '#212121',
    objectFit: 'cover' as const,
    ':not(:last-of-type)': {
      marginRight: 12,
    },
  }

  return {
    root: {},
    step: {},
    startPoint: {
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

    smCircleImg: {
      width: 210,
      height: 210,
      ...circle,
    },
    lgCircleImg: {
      width: 360,
      height: 360,
      ...circle,
    },
    gallery: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
  }
})

export default Steps
