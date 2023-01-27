import makeStyles from '@/utils/makeStyles'
import { FC, ReactNode } from 'react'
import Step from './Step'

interface StepsProps {}

const Steps: FC<StepsProps> = (props) => {
  const styles = useStyles(props)

  const steps: {
    title: string
    desc: string
    media: ReactNode
  }[] = [
    {
      title: 'Plantation',
      desc: 'Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size. Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.',
      media: (
        <img
          style={{ marginRight: 12 }}
          css={styles.lgCircleImg}
          src="/images/grape.png"
          alt=""
        />
      ),
    },
    {
      title: 'Plantation',
      desc: 'Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size. Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.',
      media: (
        <>
          <img
            style={{ marginRight: 12 }}
            css={styles.smCircleImg}
            src="/images/grape.png"
            alt=""
          />

          <img css={styles.smCircleImg} src="/images/grape.png" alt="" />
        </>
      ),
    },
    {
      title: 'Plantation',
      desc: 'Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size. Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.',
      media: (
        <img
          style={{ marginRight: 12 }}
          css={styles.lgCircleImg}
          src="/images/grape.png"
          alt=""
        />
      ),
    },
    {
      title: 'Plantation',
      desc: 'Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size. Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.Our blueberries are delicately harvested and packed in the Cañete region of Peru, being fully bloomed and large in size.',
      media: (
        <>
          <img
            style={{ marginRight: 12 }}
            css={styles.smCircleImg}
            src="/images/grape.png"
            alt=""
          />

          <img css={styles.smCircleImg} src="/images/grape.png" alt="" />
        </>
      ),
    },
  ]

  return (
    <div css={styles.root}>
      {steps.map((step, stepIdx) => (
        <Step
          key={stepIdx}
          css={styles.step}
          {...step}
          stepNum={('0' + (stepIdx + 1)).slice(-2)}
          reversed={stepIdx % 2 == 1}
          bottomSpace={80}
          verticalConnect={stepIdx + 1 < steps.length}
        />
      ))}
    </div>
  )
}

const useStyles = makeStyles(({}: StepsProps) => ({
  root: {
  },
  step: {},
    

  smCircleImg: {
    width: 210,
    height: 210,
    borderRadius: '50%',
  },
  lgCircleImg: {
    width: 360,
    height: 360,
    borderRadius: '50%',
  },
}))

export default Steps
