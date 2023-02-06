import countries from '@/data/countries'
import DocumentIcon from '@/icons/DocumentIcon'
import DoneIcon from '@/icons/DoneIcon'
import theme from '@/theme'
import CountryLabel from '@/ui/CountryLabel'
import IconButton from '@/ui/IconButton'
import Stepper from '@/ui/Stepper'
import makeStyles from '@/utils/makeStyles'
import dayjs from 'dayjs'
import { FC, useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { QuoteInput, QuoteProduct } from './quote.types'
import { calcAmount, calcTotal } from './quotePrompt.shared'

interface QuoteDealCompletedProps {
  product: QuoteProduct
  onNextStep: () => void
}

const QuoteDealCompleted: FC<QuoteDealCompletedProps> = (props) => {
  const styles = useStyles(props)

  const { product, onNextStep } = props

  const { control, getValues } = useFormContext<QuoteInput>()

  const loadingPort = useWatch({ control, name: 'loadingPort' })
  const destinationPort = useWatch({ control, name: 'destinationPort' })
  const paymentTerms = useWatch({ control, name: 'paymentTerms' })
  const volume = Number(useWatch({ control, name: 'purchaseVolume' }))
  const total = calcTotal(product.price, volume)

  const loadingCountry = useMemo(
    () => countries.find((c) => c.code === loadingPort.country)?.name,
    [loadingPort.country]
  )

  const destCountry = useMemo(
    () => countries.find((c) => c.code === destinationPort.country)?.name,
    [destinationPort.country]
  )

  const ports = [
    {
      heading: 'Port of Loading',
      title: `${loadingPort.name}, ${loadingCountry}`,
    },
    {
      heading: 'Port of Destination',
      title: `${destinationPort.name}, ${destCountry}`,
    },
  ]

  return (
    <div css={styles.root}>
      <div css={styles.qrCodeSide}>
        <div css={styles.qrCodeBox}>
          <img src="/images/qrcode.png" alt="" />
        </div>

        <div css={styles.headingWrapper}>
          <DoneIcon style={{ fontSize: 36, marginRight: 8 }} />

          <h2 css={styles.heading}>Deal Completed</h2>
        </div>
      </div>

      <div css={styles.infoSide}>
        <div css={styles.productHeader}>
          <img css={styles.productThumbnail} src={product.thumbnail} alt="" />
          <div css={styles.productDetails}>
            <h3 css={styles.productHeading}>Fresh Blueberries</h3>

            <CountryLabel countryCode={product.country} fontWeight={400} />
          </div>
        </div>

        <div css={styles.ports}>
          {ports.map((port, idx) => (
            <div key={idx} css={styles.port}>
              <h6 css={styles.portHeading}>{port.heading}</h6>
              <p css={styles.portTitle}>{port.title}</p>
            </div>
          ))}
        </div>

        <h6 css={styles.subheading}>Milestones</h6>

        <div css={styles.steps}>
          <Stepper
            activeStep={paymentTerms.length}
            steps={paymentTerms.map((step, idx) => {
              const isFirst = idx === 0

              const documents = isFirst ? ['test.pdf'] : []

              return (
                <div css={styles.step}>
                  <div css={styles.stepHeader}>
                    <div css={styles.stepTracePoint}>
                      <h4 css={styles.stepTitle}>{step.title}</h4>
                      <p>{dayjs().format('DD/MM/YYYY - HH:mm')}</p>
                    </div>

                    <div
                      css={styles.optionalDetail}
                      data-empty={documents.length === 0}
                    >
                      <div css={styles.documents}>
                        {documents.map((_, idx) => (
                          <IconButton key={idx} css={styles.document}>
                            <DocumentIcon />
                          </IconButton>
                        ))}
                      </div>
                    </div>

                    <div css={styles.amountPaid}>
                      <p>${calcAmount(total, Number(step.paidPercent))}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          />
        </div>

        <div css={styles.numPhrases}>
          <div>
            <div css={styles.numPhrase}>
              <div css={styles.numPhraseKey}>Total Price</div>
              <div css={styles.numPhraseVal}>${total}</div>
            </div>

            <div css={styles.numPhrase}>
              <div css={styles.numPhraseKey}>Volume</div>
              <div css={styles.numPhraseVal}>{volume} kg</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({}: QuoteDealCompletedProps) => {
  return {
    root: {
      display: 'grid',
      gridTemplateColumns: '400px 1fr',
      width: '100%',
      height: '100%',
      background: '#F8F8F8',
      [`@media(max-width: ${theme.widths.tablet})`]: {
        gridTemplateColumns: '1fr',
        gridAutoRows: 'auto',
        height: 'initial',
        minHeight: '100%',
      },
    },
    qrCodeSide: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: '#B1DA50',
      overflow: 'auto',
      padding: '16px 0',
      [`@media(max-width: ${theme.widths.tablet})`]: {
        padding: '32px 0',
        height: 'initial',
        overflow: 'initial',
      },
    },
    qrCodeBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
      width: 296,
      height: 296,
      borderRadius: '50%',
      [`@media (max-width: ${theme.widths.mobileXs})`]: {
        width: 275,
        height: 275,
      },
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
    },
    headingWrapper: {
      display: 'flex',
      marginTop: 24,
      [`@media (max-width: ${theme.widths.mobileXs})`]: {
        alignItems: 'center',
      },
    },
    heading: {
      fontSize: 30,
      fontWeight: 500,
      marginTop: 1,
      [`@media (max-width: ${theme.widths.mobileXs})`]: {
        fontSize: 25,
      },
    },
    infoSide: {
      overflow: 'auto',
      padding: '92px 60px 24px',
      [`@media(max-width: ${theme.widths.tablet})`]: {
        overflow: 'initial',
        padding: '32px ',
      },
      [`@media (max-width: ${theme.widths.mobile})`]: {
        padding: '32px 16px 32px',
      },
    },
    productDetails: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    productHeader: {
      display: 'flex',
      marginBottom: 20,
    },
    productThumbnail: {
      flexShrink: 0,
      borderRadius: '50%',
      width: 77,
      height: 77,
      objectFit: 'cover',
      marginRight: 24,
    },
    productHeading: {
      fontSize: 18,
      fontWeight: 700,
      flexShrink: 0,
      marginBottom: 6,
    },
    steps: {
      marginBottom: 36,
    },
    step: {
      width: '100%',
      paddingBottom: 20,
    },
    stepHeader: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) 58px 95px',
      gap: 20,
      paddingLeft: 66,
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        gap: 12,
        gridTemplateColumns: '1fr',
      },
    },
    stepTracePoint: {
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        padding: 0,
      },
    },
    documents: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      marginBottom: -10,
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        // marginBottom: -10,
        justifyContent: 'flex-start',
      },
    },
    document: {
      padding: 0,
      height: 'initial',
      width: 'initial',
      marginBottom: 10,
    },
    stepTitle: {
      fontSize: 18,
      fontWeight: 500,
    },
    mStepHead: {
      display: 'none',
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        display: 'block',
        fontSize: 12,
        color: '#9e9e9e',
        marginBottom: 2,
      },
    },
    optionalDetail: {
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        '&[data-empty="true"]': {
          display: 'none',
        },
      },
    },
    amountPaid: {
      textAlign: 'right',
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        textAlign: 'left',
      },
    },
    subheading: {
      marginBottom: 24,
      fontSize: 15,
      fontWeight: 500,
    },

    ports: {
      display: 'flex',
      marginBottom: 40,
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        flexDirection: 'column',
      },
    },
    port: {
      display: 'flex',
      ':not(:last-of-type)': {
        marginRight: 24,
      },

      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        flexDirection: 'column',

        ':not(:last-of-type)': {
          marginRight: 0,
          marginBottom: 12,
        },
      },
    },
    portHeading: {
      fontSize: 12,
      fontWeight: 400,
      marginRight: 16,
      lineHeight: 1.6,
    },
    portTitle: {
      fontSize: 14,
      fontWeight: 700,
    },

    numPhrases: {
      display: 'flex',
      justifyContent: 'flex-end',
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        justifyContent: 'flex-start',
      },
    },
    numPhrase: {
      display: 'flex',
      width: '100%',
      ':not(:last-of-type)': {
        marginBottom: 8,
      },
    },
    numPhraseKey: {
      flexShrink: 0,
      width: 100,
      flexGrow: 1,
    },
    numPhraseVal: {
      flexShrink: 0,
      color: '#B1DA50',
      fontWeight: 700,
    },
  }
})

export default QuoteDealCompleted
