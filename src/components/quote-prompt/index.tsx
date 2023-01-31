import Dialog from '@/ui/Dialog'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes, FunctionComponent, useState } from 'react'
import QuoteStep1 from './QuoteStep1'
import CloseIcon from '@/icons/CloseIcon'
import { useForm, FormProvider } from 'react-hook-form'
import { QuoteInput, QuoteProduct } from './quote.types'
import QuoteStep2 from './QuoteStep2'
import BackIcon from '@/icons/BackIcon'
import QuoteOrderSent from './QuoteOrderSent'
import QuoteEvaluate from './QuoteEvaluate'
import theme from '@/theme'

interface QuotePromptProps extends HTMLAttributes<HTMLDivElement> {
  product: QuoteProduct
  open: boolean
  onClose: () => void
}

const QuotePrompt: FC<QuotePromptProps> = (props) => {
  const styles = useStyles(props)

  const [slideIdx, setSlideIdx] = useState<number>(0)

  const { product, open, onClose, ...divProps } = props

  const formMethods = useForm<QuoteInput>({
    defaultValues: {
      company: '',
      name: '',
      email: '',
      phone: '',
      destinationPort: {
        shippingType: 'FOB',
        country: 'PE',
        name: '',
      },
      landingPort: {
        shippingType: 'FOB',
        country: 'PE',
        name: '',
      },
      needs: '',
      purchaseVolume: '',
      paymentTerms: [
        {
          placeholder: 'Down payment',
          title: 'Down payment',
          amount: '',
          paidPercent: '',
        },
        {
          placeholder: 'Cash Against Documents',
          title: 'Cash Against Documents',
          amount: '',
          paidPercent: '',
        },
        {
          placeholder: 'On Arrival',
          title: 'On Arrival',
          amount: '',
          paidPercent: '',
        },
      ],
    },
  })

  const slides: {
    component: FunctionComponent<{
      product: QuoteProduct
      onNextSlide: () => void
    }>
    isStep?: boolean
    isHideToggleBtn?: boolean
    isHideStepsDisplay?: boolean
  }[] = [
    {
      component: QuoteStep1,
      isStep: true,
    },
    {
      component: QuoteEvaluate,
      isHideToggleBtn: true,
    },
    {
      component: QuoteStep2,
      isStep: true,
    },
    {
      component: QuoteOrderSent,
      isStep: true,
      isHideStepsDisplay: true,
      isHideToggleBtn: true,
    },
  ]

  const nextSlide = () =>
    setSlideIdx((prevSlideIdx) =>
      prevSlideIdx < slides.length ? prevSlideIdx + 1 : slides.length - 1
    )

  const prevSlide = () => {
    let prevSlideIndex = -1

    const slicedSlides = slides.slice(0, slideIdx)
    for (let i = slicedSlides.length - 1; i >= 0; i--) {
      if (slicedSlides[i].isStep) {
        prevSlideIndex = i
        break
      }
    }

    if (prevSlideIndex > -1) {
      setSlideIdx(prevSlideIndex)
    } else {
      onClose()
    }
  }

  const slide = slides[slideIdx]

  let stepNum = slide.isStep
    ? slides.slice(0, slideIdx).filter((s) => s.isStep).length + 1
    : null

  return (
    <Dialog
      css={styles.dialog}
      dialogStyle={{ display: open ? undefined : 'none' }}
      {...divProps}
    >
      {!slide.isHideToggleBtn && (
        <button css={styles.dialogBtn} onClick={prevSlide}>
          {slideIdx <= 0 ? <CloseIcon /> : <BackIcon />}
        </button>
      )}

      {stepNum && !slide.isHideStepsDisplay && (
        <div css={styles.stepHeader}>{stepNum} of 3</div>
      )}

      <FormProvider {...formMethods}>
        <slide.component product={product} onNextSlide={nextSlide} />
      </FormProvider>
    </Dialog>
  )
}

const useStyles = makeStyles(({}: QuotePromptProps) => ({
  dialog: {
    position: 'relative',
    fontFamily: theme.fonts.secondary
  },
  stepHeader: {
    position: 'absolute',
    right: 54,
    top: 18,
    fontSize: 14,
    [`@media (max-width: ${theme.widths.tablet})`]: {
      right: 16,
    },
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
