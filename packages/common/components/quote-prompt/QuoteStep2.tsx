import {
  FC,
  FormEventHandler,
  HTMLAttributes,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { QuoteInput, QuoteProduct } from './quote.types'
import { FieldValue } from '../FieldValue'
import { gql } from 'graphql-request'
import { QuoteOrderSent } from './QuoteOrderSent'
import { calcAmount, calcTotal } from './quotePrompt.shared'
import { Button, CountryLabel, Input } from '../../ui'
import { graphqlReq, makeStyles } from '../../utils'
import { countries } from '../../data'
import { AddIcon, EmailIcon, PhoneIcon } from '../../icons'
import { theme } from '../../theme'
import { QuoteFeatures } from './QuoteFeatures'
import { toast } from 'react-toastify'

export interface Step2Values {}

const SEND_MAIL = gql`
  mutation ($input: ContactMailInput!) {
    sendContactMail(input: $input)
  }
`

interface QuoteStep2Props extends HTMLAttributes<HTMLFormElement> {
  product: QuoteProduct
  onNextStep: () => void
}

export const QuoteStep2: FC<QuoteStep2Props> = (props) => {
  const styles = useStyles(props)

  const { product, onNextStep, ...formProps } = props

  const { control, getValues } = useFormContext<QuoteInput>()

  const [completed, setCompleted] = useState(false)

  const paymentTermsControl = useFieldArray({
    name: 'paymentTerms',
    control,
  })

  const addPaymentTerm = () =>
    paymentTermsControl.append({
      title: '',
      paidPercent: '',
    })

  const company = useWatch({ control, name: 'company' })
  const name = useWatch({ control, name: 'name' })
  const phone = useWatch({ control, name: 'phone' })
  const email = useWatch({ control, name: 'email' })
  const loadingPort = useWatch({ control, name: 'loadingPort' })
  const destinationPort = useWatch({ control, name: 'destinationPort' })
  const purchaseVolume = useWatch({ control, name: 'purchaseVolume' })
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

  const isSaving = useRef(false)

  const stringifyInfo = () => {
    const {
      company,
      name,
      email,
      phone,
      loadingPort,
      destinationPort,
      purchaseVolume,
      needs,
      paymentTerms,
    } = getValues()

    const baseInfo = [
      `Company: ${company}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Port of Loading: ${loadingPort.shippingType} - ${loadingPort.name}, ${loadingCountry}`,
      `Port of Destination: ${destinationPort.shippingType} - ${destinationPort.name}, ${destCountry}`,
      `Purchase Volume: ${purchaseVolume} kg`,
      `Needs: ${needs}`,
    ]

    const terms = paymentTerms.map(
      ({ title, paidPercent }) =>
        `${title} - ${paidPercent}% - ${calcAmount(total, paidPercent)}`
    )

    return (
      'Quote Request' +
      '\n\n' +
      baseInfo.join('\n') +
      '\n\n\n' +
      'Payment Terms:' +
      '\n' +
      terms.join('\n')
    )
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (isSaving.current) return

    const { email, paymentTerms } = getValues()

    const totalPercent = paymentTerms.reduce(
      (acc, { paidPercent }) => acc + Number(paidPercent),
      0
    )

    if (totalPercent !== 100) {
      return toast('The total paid percent of all milestones must be 100%')
    }

    isSaving.current = true

    const infoText = stringifyInfo()

    try {
      await graphqlReq(SEND_MAIL, {
        input: {
          subject: 'Quote Request',
          content: infoText,
          replyTo: email,
        },
      })

      setCompleted(true)
    } catch {
    } finally {
      isSaving.current = false
    }
  }

  return !completed ? (
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
                {loadingPort.name}, {loadingCountry}
              </th>
              <td css={styles.deskDetailVal}>
                {destinationPort.name}, {destCountry}
              </td>
              <td css={styles.deskDetailVal} data-emphasize="true">
                {purchaseVolume} kg
              </td>
              <td css={styles.deskDetailVal} data-emphasize="true">
                ${total}
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
              {loadingPort.name} {loadingCountry}
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
              ${total}
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
              <span css={styles.infoValText} data-nowrap="true">
                +{phone}
              </span>
            </p>

            <p css={styles.infoVal}>
              <EmailIcon css={styles.infoValIcon} />
              <span css={styles.infoValText} data-nowrap="true">
                {email}
              </span>
            </p>
          </div>
        </div>

        <h2 css={styles.subHeading} style={{ marginBottom: 30 }}>
          PAYMENT TERMS
        </h2>

        <div style={{ marginBottom: 8 }}>
          {paymentTermsControl.fields.map((paymentTerm, idx) => (
            <div css={styles.termWrapper} key={paymentTerm.id}>
              <span css={styles.termKey}>{idx + 1}</span>

              <div css={styles.term}>
                <div css={styles.termInputWrapper} data-term-title="true">
                  <Input
                    control={control}
                    placeholder={paymentTerm.placeholder}
                    name={`paymentTerms.${idx}.title`}
                    required
                  />
                </div>

                <div css={styles.termPayment}>
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
                    <FieldValue
                      name={`paymentTerms.${idx}.paidPercent`}
                      control={control}
                    >
                      {(percent) => (
                        <Input
                          startAdornment="$"
                          placeholder="0.00"
                          name={`paymentTerms.${idx}.amount`}
                          required
                          pattern="[0-9]+(\.[0-9]+)?"
                          inputVal={calcAmount(total, percent) ?? ''}
                          readOnly
                        />
                      )}
                    </FieldValue>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
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
            const totalPercent = paymentTerms.reduce(
              (acc, { paidPercent }) => acc + Number(paidPercent),
              0
            )

            const inputTotal = calcAmount(total, totalPercent)

            return (
              <p css={styles.totalPrice}>
                <span css={styles.totalPriceHeading}>Total price</span>$ {total}
              </p>
            )
          }}
        </FieldValue>
      </div>

      <QuoteFeatures css={styles.features} />
    </form>
  ) : (
    <QuoteOrderSent onNextStep={onNextStep} product={product} />
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
      fontSize: 14,
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
    '&[data-nowrap="true"]': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  },
  termWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    ':not(:last-of-type)': {
      marginBottom: 15,
    },
    '@media (max-width: 520px)': {
      alignItems: 'start',
    },
  },
  termKey: {
    width: 25,
    flexShrink: 0,
    '@media (max-width: 520px)': {
      paddingTop: 10,
    },
  },
  term: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    flexGrow: 1,
    '@media (max-width: 520px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
  termPayment: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 0.4fr) minmax(0, 0.6fr)',
  },
  termInputWrapper: {
    width: '100%',
    ':not(:last-of-type)': {
      paddingRight: 15,
    },
    '@media (max-width: 520px)': {
      ':not(:last-of-type)': {
        paddingRight: 8,
      },
      '&[data-term-title="true"]': {
        paddingRight: 0,
        paddingBottom: 4,
      },
    },
  },
  totalPrice: {
    textAlign: 'right',
    [`@media (max-width: ${theme.widths.mobile})`]: {
      marginTop: 12,
    },
  },
  totalPriceHeading: {
    marginRight: 40,

    [`@media (max-width: ${theme.widths.mobile})`]: {
      marginRight: 12,
    },
  },
}))
