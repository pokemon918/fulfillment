import Dialog from '@/ui/Dialog'
import Portal from '@/components/Portal'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes, useState } from 'react'
import QuoteStep1 from './QuoteStep1'
import CloseIcon from '@/icons/CloseIcon'
import IconButton from '@/ui/IconButton'

interface QuotePromptProps extends HTMLAttributes<HTMLDivElement> {
  product: {
    name: string
    thumbnail: string
    country: string
  }
  fontFamily?: string
}

const QuotePrompt: FC<QuotePromptProps> = (props) => {
  const styles = useStyles(props)

  const [step, setStep] = useState<1 | 2 | 3>(1)

  const { product, fontFamily, ...divProps } = props

  const nextStep = () =>
    setStep((prevStep) => (prevStep < 3 ? prevStep + 1 : 3) as typeof step)

  const prevStep = () =>
    setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : 0) as typeof step)

  let stepInterface

  if (step === 1) {
    stepInterface = <QuoteStep1 product={product} onNextStep={nextStep} />
  }

  return (
    <Portal>
      <Dialog css={styles.dialog} {...divProps}>
        <button css={styles.dialogBtn}>
          <CloseIcon />
        </button>

        <div css={styles.stepHeader}>{step} of 3</div>

        {stepInterface}
      </Dialog>
    </Portal>
  )
}

const useStyles = makeStyles(({ fontFamily }: QuotePromptProps) => ({
  dialog: {
    position: 'relative',
    fontFamily,
  },
  stepHeader: {
    position: 'absolute',
    right: 54,
    top: 18,
    fontSize: 14,
  },
  dialogBtn: {
    position: 'absolute',
    left: 10,
    top: 6,
    display: 'inline-flex',
    border: 'none',
    padding: 6,
    background: 'transparent',
    cursor: 'pointer',
  },
}))

export default QuotePrompt
