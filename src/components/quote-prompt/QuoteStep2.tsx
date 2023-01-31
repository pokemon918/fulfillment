import EmailIcon from '@/icons/EmailIcon'
import PhoneIcon from '@/icons/PhoneIcon'
import CountryLabel from '@/ui/CountryLabel'
import Input from '@/ui/Input'
import makeStyles from '@/utils/makeStyles'
import { FC, FormEventHandler, HTMLAttributes, useMemo } from 'react'
import QuoteFeatures from './QuoteFeatures'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { QuoteInput, QuoteProduct } from './quote.types'
import AddIcon from '@/icons/AddIcon'
import Button from '@/ui/Button'
import countries from '@/data/countries'
import FieldValue from '../FieldValue'
import theme from '@/theme'

export interface Step2Values {}

interface QuoteStep2Props extends HTMLAttributes<HTMLFormElement> {
  product: QuoteProduct
  onNextSlide: () => void
}

const QuoteStep2: FC<QuoteStep2Props> = (props) => {
  const styles = useStyles(props)

  const { product, onNextSlide, ...formProps } = props

  const { control } = useFormContext<QuoteInput>()

  const paymentTermsControl = useFieldArray({
    name: 'paymentTerms',
    control,
  })

  const addPaymentTerm = () =>
    paymentTermsControl.append({
      title: '',
      amount: '',
      paidPercent: '',
    })

  const company = useWatch({ control, name: 'company' })
  const name = useWatch({ control, name: 'name' })
  const phone = useWatch({ control, name: 'phone' })
  const email = useWatch({ control, name: 'email' })
  const landingPort = useWatch({ control, name: 'landingPort' })
  const destinationPort = useWatch({ control, name: 'destinationPort' })
  const purchaseVolume = useWatch({ control, name: 'purchaseVolume' })

  const landingCountry = useMemo(
    () => countries.find((c) => c.code === landingPort.country)?.name,
    [landingPort.country]
  )

  const destCountry = useMemo(
    () => countries.find((c) => c.code === destinationPort.country)?.name,
    [destinationPort.country]
  )

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    onNextSlide()
  }

  const roundedPrice = +(product.price * Number(purchaseVolume)).toFixed(2)

  return (
    <form onSubmit={handleSubmit} css={styles.root} {...formProps}>
      <div css={styles.mainSection}>
        <table css={styles.deskDetails}>
          <thead>
            <tr>
              <th css={styles.deskDetailHead}>{product.name}</th>
              <th css={styles.deskDetailKey}>Port of Loading</th>
              <th css={styles.deskDetailKey}>Port of Destination</th>
              <th css={styles.deskDetailKey} style={{ textAlign: 'right' }}>
                Volume
              </th>
              <th css={styles.deskDetailKey} style={{ textAlign: 'right' }}>
                Price
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th css={styles.deskDetailVal}>
                <CountryLabel countryCode={product.country} fontWeight={400} />
              </th>
              <th css={styles.deskDetailVal}>
                {landingPort.name}, {landingCountry}
              </th>
              <td css={styles.deskDetailVal}>
                {destinationPort.name}, {destCountry}
              </td>
              <td css={styles.deskDetailVal} data-emphasize="true">
                {purchaseVolume} kg
              </td>
              <td css={styles.deskDetailVal} data-emphasize="true">
                ${roundedPrice}
              </td>
            </tr>
          </tbody>
        </table>

        <div css={styles.mobileDetailsHeader}>
          <h3 css={styles.mobileDetailsHeading}>{product.name}</h3>
          <CountryLabel countryCode={product.country} fontWeight={400} />
        </div>

        <div css={styles.mobileDetails}>
          <div css={styles.mobileDetail}>
            <span css={styles.mobileDetailKey}>Port of Loading</span>
            <span css={styles.mobileDetailVal}>
              {landingPort.name} {landingCountry}
            </span>
          </div>

          <div css={styles.mobileDetail}>
            <span css={styles.mobileDetailKey}>Port of Destination</span>
            <span css={styles.mobileDetailVal}>
              {destinationPort.name}, {destCountry}
            </span>
          </div>

          <div css={styles.mobileDetail}>
            <span css={styles.mobileDetailKey}>Volume</span>
            <span css={styles.mobileDetailVal} data-emphasize="true">
              {purchaseVolume} kg
            </span>
          </div>

          <div css={styles.mobileDetail}>
            <span css={styles.mobileDetailKey}>Price</span>
            <span css={styles.mobileDetailVal} data-emphasize="true">
              ${roundedPrice}
            </span>
          </div>
        </div>

        <h2 css={styles.subHeading} style={{ marginBottom: 20 }}>
          YOUR INFORMATION
        </h2>

        <div css={styles.info} style={{ marginBottom: 38 }}>
          <div css={styles.infoSection}>
            <p css={styles.infoVal}>{company}</p>
            <p css={styles.infoVal}>{name}</p>
          </div>

          <div css={styles.infoSection}>
            <p css={styles.infoVal}>
              <PhoneIcon css={styles.infoValIcon} />
              <span css={styles.infoValText}>+{phone}</span>
            </p>

            <p css={styles.infoVal}>
              <EmailIcon css={styles.infoValIcon} />
              <span css={styles.infoValText}>{email}</span>
            </p>
          </div>
        </div>

        <h2 css={styles.subHeading} style={{ marginBottom: 30 }}>
          PAYMENT TERMS
        </h2>

        {/* <div style={{ marginBottom: 8 }}>
          {paymentTermsControl.fields.map((paymentTerm, idx) => (
            <div css={styles.term} key={paymentTerm.id}>
              <span>{idx + 1}</span>
              <div css={styles.termInputWrapper}>
                <Input
                  control={control}
                  placeholder={paymentTerm.placeholder}
                  name={`paymentTerms.${idx}.title`}
                  required
                />
              </div>

              <div css={styles.termInputWrapper}>
                <Input
                  endAdornment="%"
                  control={control}
                  name={`paymentTerms.${idx}.paidPercent`}
                  required
                  pattern="(100|[0-9]{1,2})(\.[0-9]+)?"
                />
              </div>

              <div css={styles.termInputWrapper}>
                <Input
                  startAdornment="$"
                  placeholder="0.00"
                  control={control}
                  name={`paymentTerms.${idx}.amount`}
                  required
                  pattern="[0-9]+(\.[0-9]+)?"
                />
              </div>
            </div>
          ))}
        </div> */}

        {/* <Button
          style={{
            background: 'transparent',
            minWidth: 'initial',
            marginLeft: -9,
          }}
          startIcon={<AddIcon style={{ fontSize: 20 }} />}
          onClick={addPaymentTerm}
        >
          Add Terms
        </Button>

        <FieldValue control={control} name="paymentTerms">
          {(paymentTerms: QuoteInput['paymentTerms']) => {
            const total = paymentTerms.reduce((acc, paymentTerm) => {
              const amount = !Number.isNaN(Number(paymentTerm.amount))
                ? Number(paymentTerm.amount)
                : 0
              return acc + amount
            }, 0)

            return (
              <p style={{ textAlign: 'right' }}>
                <span style={{ marginRight: 40 }}>Total price</span>${' '}
                {+total.toFixed(2)}
              </p>
            )
          }}
        </FieldValue> */}
      </div>

      <QuoteFeatures css={styles.features} />
    </form>
  )
}

const useStyles = makeStyles(({}: QuoteStep2Props) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 355px',
    width: '100%',
    height: '100%',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      gridTemplateColumns: '1fr',
    },
  },
  mainSection: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    padding: '46px 38px 40px',
    background: '#F8F8F8',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      overflowY: 'initial',
    },
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      paddingLeft: 32,
      paddingRight: 32,
    },
    [`@media (max-width: ${theme.widths.mobile})`]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
  },
  features: {
    overflowY: 'auto',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      overflowY: 'initial',
    },
  },
  deskDetails: {
    width: '100%',
    textAlign: 'left',
    marginBottom: 46,
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      display: 'none',
    },
  },
  deskDetailKey: {
    padding: '0 6px 6px',
    fontSize: 12,
    fontWeight: 400,
    whiteSpace: 'nowrap',
  },
  deskDetailHead: {
    padding: '0 6px 6px',
    fontSize: 18,
    fontWeight: 700,
    // color: '#B1DA50',
  },
  deskDetailVal: {
    fontWeight: 400,
    padding: '0 6px',
    '&[data-emphasize="true"]': {
      textAlign: 'right',
      color: '#B1DA50',
      fontWeight: 700,
      padding: '0 6px',
    },
  },
  mobileDetails: {
    marginBottom: 46,
    display: 'none',
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      fontSize: 14,
      display: 'block',
    },
  },
  mobileDetailsHeader: {
    marginBottom: 20,
    display: 'none',
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      display: 'block',
    },
  },
  mobileDetailsHeading: {
    marginBottom: 4,
    fontSize: 18,
    fontWeight: 700,
  },
  mobileDetail: {
    marginBottom: 8,
  },
  mobileDetailKey: {
    color: '#9e9e9e',
    marginRight: 12,
  },
  mobileDetailVal: {
    '&[data-emphasize="true"]': {
      color: '#B1DA50',
      fontWeight: 700,
    },
  },
  right: {
    textAlign: 'right',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 700,
    color: '#B1DA50',
  },
  info: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: 42,
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      gridTemplateColumns: '1fr',
      gap: 8,
      fontSize: 14
    },
  },
  infoSection: {
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      width: '100%',
      overflow: 'hidden',
    },
  },
  infoVal: {
    display: 'flex',
    alignItems: 'center',
    ':not(:last-of-type)': {
      marginBottom: 10,
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        marginBottom: 8,
      },
    },
  },
  infoValIcon: {
    marginRight: 16,
    flexShrink: 0,
  },
  infoValText: {
    flexGrow: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  term: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns:
      '25px minmax(0, 1fr) minmax(0, 0.4fr) minmax(0, 0.7fr)',
    alignItems: 'center',
    ':not(:last-of-type)': {
      marginBottom: 15,
    },
  },
  termInputWrapper: {
    width: '100%',
    ':not(:last-of-type)': {
      paddingRight: 15,
    },
  },
}))

export default QuoteStep2
