import DocumentIcon from '@/icons/DocumentIcon'
import theme from '@/theme'
import Button from '@/ui/Button'
import CountryLabel from '@/ui/CountryLabel'
import IconButton from '@/ui/IconButton'
import MiniGallery from '@/ui/MiniGallery'
import Stepper from '@/ui/Stepper'
import makeStyles from '@/utils/makeStyles'
import dayjs from 'dayjs'
import { FC, HTMLAttributes, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import GallerySingleView from '../gallery/GallerySingleView'
import { QuoteInput, QuoteProduct } from './quote.types'
import QuoteDealCompleted from './QuoteDealCompleted'
import { calcAmount, calcTotal } from './quotePrompt.shared'

interface QuoteStep3Props extends HTMLAttributes<HTMLFormElement> {
  product: QuoteProduct
  onNextStep: () => void
}

const heads = [
  {
    label: 'Traceability point',
  },
  {
    label: 'Location',
  },
  {
    label: 'Time',
  },
  {
    label: 'Amount Paid',
  },
  {
    label: 'Documentation',
    right: true,
  },
]

const additionalTermsData: {
  documents?: string[]
  images?: string[]
}[] = [
  {
    documents: ['test.pdf'],
    images: [
      '/images/apples.jpg',
      '/images/orange-trees.jpg',
      '/images/kiwi.jpg',
    ],
  },
]

const QuoteStep3: FC<QuoteStep3Props> = (props) => {
  const styles = useStyles(props)

  const { product, onNextStep, ...formProps } = props

  const { control, getValues } = useFormContext<QuoteInput>()

  const loadingPort = useWatch({ control, name: 'loadingPort' })
  const destinationPort = useWatch({ control, name: 'destinationPort' })
  const paymentTerms = useWatch({ control, name: 'paymentTerms' })
  const volume = Number(useWatch({ control, name: 'purchaseVolume' }))
  const total = calcTotal(product.price, volume)
  const [gallery, setGallery] = useState<{
    open: boolean
    images: string[]
    viewingIdx: number
  } | null>(null)

  const [completed, setCompleted] = useState(false)

  const closeGallery = () =>
    setGallery((prevGallery) =>
      prevGallery
        ? {
            ...prevGallery,
            open: false,
          }
        : null
    )

  const nextImage = () => {
    setGallery((prevGallery) => {
      if (!prevGallery) return null

      const { images, viewingIdx } = prevGallery
      const nextViewIdx = viewingIdx + 1

      return {
        ...prevGallery,
        viewingIdx:
          nextViewIdx < images.length ? nextViewIdx : images.length - 1,
      }
    })
  }

  const prevImage = () => {
    setGallery((prevGallery) => {
      if (!prevGallery) return null

      const { viewingIdx } = prevGallery
      const prevViewIdx = viewingIdx - 1

      return {
        ...prevGallery,
        viewingIdx: prevViewIdx >= 0 ? prevViewIdx : 0,
      }
    })
  }

  return !completed ? (
    <div css={styles.root}>
      <div css={styles.stepsHeader}>
        {heads.map((head) => (
          <div
            key={head.label}
            style={{ textAlign: head.right ? 'right' : undefined }}
          >
            {head.label}
          </div>
        ))}
      </div>

      <Stepper
        activeStep={1}
        steps={paymentTerms.map((step, idx) => {
          const isFirst = idx === 0
          const isLast = idx + 1 === paymentTerms.length

          const port = isLast ? destinationPort : loadingPort

          const { documents = [], images = [] } = additionalTermsData[idx] || {}

          return (
            <div css={styles.step}>
              <div css={styles.stepHeader}>
                <div css={styles.stepTracePoint}>
                  <h4 css={styles.stepTitle}>{step.title}</h4>
                  <p>1245</p>
                </div>

                <div>
                  <p css={styles.mStepHead}>Location</p>
                  <CountryLabel
                    countryCode={port.country}
                    fontWeight={400}
                    address={port.name}
                  />
                </div>

                <div css={styles.optionalDetail}>
                  <p css={styles.mStepHead}>Time</p>
                  <p css={styles.timeVal}>
                    {dayjs().format('DD/MM/YYYY - HH:mm')}
                  </p>
                </div>

                <div css={styles.amountPaid}>
                  <p css={styles.mStepHead}>Amount Paid</p>
                  <p>${calcAmount(total, Number(step.paidPercent))}</p>
                </div>

                <div
                  css={styles.optionalDetail}
                  data-empty={documents.length === 0}
                >
                  <p css={styles.mStepHead}>Documents</p>
                  <div css={styles.documents}>
                    {documents.map((_, idx) => (
                      <IconButton key={idx} css={styles.document}>
                        <DocumentIcon />
                      </IconButton>
                    ))}
                  </div>
                </div>
              </div>

              <div css={styles.stepBody}>
                {images.length > 0 && (
                  <MiniGallery
                    style={{ marginTop: 14 }}
                    images={images}
                    onClickView={(imageIdx) =>
                      setGallery({ open: true, images, viewingIdx: imageIdx })
                    }
                  />
                )}
              </div>
            </div>
          )
        })}
      />

      <div css={styles.footer}>
        <Button onClick={() => setCompleted(true)}>Next</Button>
      </div>

      <GallerySingleView
        open={gallery?.open ?? false}
        images={gallery?.images ?? []}
        viewingIdx={gallery?.viewingIdx ?? -1}
        onClose={closeGallery}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  ) : (
    <QuoteDealCompleted product={product} onNextStep={onNextStep} />
  )
}

const useStyles = makeStyles(({}: QuoteStep3Props) => {
  const stepPadding = {
    paddingLeft: 66,
  }

  const grid = {
    display: 'grid',
    gridTemplateColumns:
      'minmax(0, 1fr) minmax(0, 0.75fr) minmax(0, 0.6fr) 96px 153px',
    gap: 20,
  }

  return {
    root: {
      width: '100%',
      minHeight: '100%',
      background: '#F8F8F8',
      padding: '76px 48px 24px',
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        padding: '76px 16px 24px',
      },
    },
    stepsHeader: {
      width: '100%',
      marginBottom: 30,
      borderBottom: '1px solid #505050',
      paddingBottom: 12,
      ...grid,
      [`@media (max-width: ${theme.widths.tablet})`]: {
        display: 'none',
      },
    },
    step: {
      width: '100%',
      paddingBottom: 38,
    },
    stepHeader: {
      width: '100%',
      ...grid,
      [`@media (max-width: ${theme.widths.tablet})`]: {
        gridTemplateColumns: '1fr',
        ...stepPadding,
      },
    },
    stepTracePoint: {
      ...stepPadding,
      [`@media (max-width: ${theme.widths.tablet})`]: {
        padding: 0,
      },
    },
    stepTitle: {
      fontSize: 18,
      fontWeight: 500,
    },
    amountPaid: {
      textAlign: 'right',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        textAlign: 'left',
      },
    },
    documents: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      marginBottom: -10,
      [`@media (max-width: ${theme.widths.tablet})`]: {
        justifyContent: 'flex-start',
      },
    },
    document: {
      padding: 0,
      height: 'initial',
      width: 'initial',
      marginBottom: 10,
    },
    stepBody: {
      ...stepPadding,
    },
    mStepHead: {
      display: 'none',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        display: 'block',
        fontSize: 12,
        color: '#9e9e9e',
        marginBottom: 2,
      },
    },
    optionalDetail: {
      [`@media (max-width: ${theme.widths.tablet})`]: {
        '&[data-empty="true"]': {
          display: 'none',
        },
      },
    },
    footer: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    timeVal: {
      fontSize: 15,
      [`@media (max-width: ${theme.widths.tablet})`]: {
        fontSize: 'inherit',
      },
    },
  }
})

export default QuoteStep3
