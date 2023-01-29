import Dialog from '@/ui/Dialog'
import Portal from '@/components/Portal'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes, useState } from 'react'
import QuoteStep1 from './QuoteStep1'
import CloseIcon from '@/icons/CloseIcon'
import { useForm, FormProvider } from 'react-hook-form'
import { QuoteInput, QuoteProduct } from './quote.types'
import QuoteStep2 from './QuoteStep2'
import BackIcon from '@/icons/BackIcon'

interface QuotePromptProps extends HTMLAttributes<HTMLDivElement> {
  product: QuoteProduct
  fontFamily?: string
}

const QuotePrompt: FC<QuotePromptProps> = (props) => {
  const styles = useStyles(props)

  const [step, setStep] = useState<1 | 2 | 3>(1)

  const { product, fontFamily, ...divProps } = props

  const formMethods = useForm<QuoteInput>({
    defaultValues: {
      company: '',
      name: '',
      email: '',
      phone: '',
      destinationPort: {
        shippingType: 'FOB',
        country: 'PE',
        name: 'FOB',
      },
      landingPort: {
        shippingType: 'FOB',
        country: 'PE',
        name: 'FOB',
      },
      needs: '',
      purchaseVolume: '',
      paymentTerms: [
        { placeholder: 'Down payment', title: '', amount: '', paidPercent: '' },
        {
          placeholder: 'Cash Against Documents',
          title: '',
          amount: '',
          paidPercent: '',
        },
        { placeholder: 'On Arrival', title: '', amount: '', paidPercent: '' },
      ],
    },
  })

  const nextStep = () =>
    setStep((prevStep) => (prevStep < 3 ? prevStep + 1 : 3) as typeof step)

  const prevStep = () => {
    if (step <= 1) return

    setStep((prevStep) => (prevStep - 1) as typeof step)
  }

  const QuoteStep = {
    1: QuoteStep1,
    2: QuoteStep2,
    3: QuoteStep1,
  }[step]

  return (
    <Portal>
      <Dialog css={styles.dialog} {...divProps}>
        <button css={styles.dialogBtn} onClick={prevStep}>
          {step > 1 ? <BackIcon /> : <CloseIcon />}
        </button>

        <div css={styles.stepHeader}>{step} of 3</div>

        <FormProvider {...formMethods}>
          <QuoteStep product={product} onNextStep={nextStep} />
        </FormProvider>
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
    left: 8,
    top: 6,
    display: 'inline-flex',
    border: 'none',
    padding: 6,
    background: 'transparent',
    cursor: 'pointer',
  },
}))

export default QuotePrompt
