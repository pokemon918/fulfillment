import { Dialog } from '../../ui'
import {
  FC,
  HTMLAttributes,
  FunctionComponent,
  useState,
  memo,
  useEffect,
} from 'react'
import { QuoteStep1 } from './QuoteStep1'
import { CloseIcon, BackIcon } from '../../icons'
import { useForm, FormProvider } from 'react-hook-form'
import { QuoteInput, QuoteProduct } from './quote.types'
import { QuoteStep2 } from './QuoteStep2'
import { theme } from '../../theme'
import { QuoteStep3 } from './QuoteStep3'
import { gql } from 'graphql-request'
import { graphqlReq, makeStyles } from '../../utils'

interface QuotePromptProps extends HTMLAttributes<HTMLDivElement> {
  product: QuoteProduct
  onClose: () => void
  userProfile?: {
    fullName: string
    companyName: string
    email: string
    phone: string
  }
}

const GET_USER_PROFILE = gql`
  {
    userProfile {
      _id
      fullName
      companyName
      email
      phone
    }
  }
`

export const QuotePrompt: FC<QuotePromptProps> = (props) => {
  const styles = useStyles(props)

  const [stepIdx, setStepIdx] = useState<number>(0)

  const { product, onClose, userProfile, ...divProps } = props

  const formMethods = useForm<QuoteInput>({
    defaultValues: {
      company: userProfile?.companyName ?? '',
      name: userProfile?.fullName ?? '',
      email: userProfile?.email ?? '',
      phone: userProfile?.phone ?? '',
      destinationPort: {
        shippingType: 'FOB',
        country: 'PE',
        name: '',
      },
      loadingPort: {
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
          paidPercent: '',
        },
        {
          placeholder: 'Cash Against Documents',
          title: 'Cash Against Documents',
          paidPercent: '',
        },
        {
          placeholder: 'On Arrival',
          title: 'On Arrival',
          paidPercent: '',
        },
      ],
    },
  })

  const steps: {
    component: FunctionComponent<{
      product: QuoteProduct
      onNextStep: () => void
    }>
    isHideStepsDisplay?: boolean
  }[] = [
    {
      component: QuoteStep1,
    },
    {
      component: QuoteStep2,
    },
    {
      component: QuoteStep3,
    },
  ]

  const isLast = stepIdx + 1 >= steps.length
  const isPromptClosable = stepIdx <= 0 || isLast

  const nextStep = () =>
    setStepIdx((prevStepIdx) =>
      prevStepIdx < steps.length ? prevStepIdx + 1 : steps.length - 1
    )

  const prevStep = () => {
    if (!isPromptClosable) {
      setStepIdx((prevStepIdx) => (prevStepIdx > 0 ? prevStepIdx - 1 : 0))
    } else {
      onClose()

      if (isLast) {
        setStepIdx(0)
        formMethods.reset()
      }
    }
  }

  const step = steps[stepIdx]

  useEffect(() => {
    ;(async () => {
      const { userProfile } = await graphqlReq(GET_USER_PROFILE)

      if (userProfile) {
        formMethods.setValue('name', userProfile.fullName)
        formMethods.setValue('company', userProfile.companyName)
        formMethods.setValue('email', userProfile.email)
        formMethods.setValue('phone', userProfile.phone)
      }
    })()
  }, [])

  return (
    <Dialog css={styles.dialog} {...divProps}>
      <button css={styles.dialogBtn} onClick={prevStep}>
        {isPromptClosable ? <CloseIcon /> : <BackIcon />}
      </button>

      {!step.isHideStepsDisplay && (
        <div css={styles.stepHeader}>{stepIdx + 1} of 3</div>
      )}

      <FormProvider {...formMethods}>
        <step.component product={product} onNextStep={nextStep} />
      </FormProvider>
    </Dialog>
  )
}

const useStyles = makeStyles(({}: QuotePromptProps) => ({
  dialog: {
    position: 'relative',
    fontFamily: theme.fonts.secondary,
  },
  stepHeader: {
    position: 'absolute',
    right: 54,
    top: 18,
    fontSize: 14,
    [`@media (max-width: ${theme.widths.tablet})`]: {
      right: 32,
    },
    [`@media (max-width: ${theme.widths.mobile})`]: {
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
