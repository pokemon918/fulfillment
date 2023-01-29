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

export interface Step2Values {}

interface QuoteStep2Props extends HTMLAttributes<HTMLFormElement> {
  product: QuoteProduct
  onNextStep: () => void
}

const QuoteStep2: FC<QuoteStep2Props> = (props) => {
  const styles = useStyles(props)

  const { product, onNextStep, ...formProps } = props

  const { control, getValues } = useFormContext<QuoteInput>()

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

    onNextStep()
  }

  return (
    <form onSubmit={handleSubmit} css={styles.root} {...formProps}>
      <div css={styles.mainSection}>
        <table css={styles.details}>
          <thead>
            <tr>
              <th css={styles.detailHead}>{product.name}</th>
              <th css={styles.detailKey}>Port of Loading</th>
              <th css={styles.detailKey}>Port of Destination</th>
              <th css={styles.detailKey} style={{ textAlign: 'right' }}>
                Volume
              </th>
              <th css={styles.detailKey} style={{ textAlign: 'right' }}>
                Price
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th css={styles.detailVal}>
                <CountryLabel countryCode={product.country} fontWeight={400} />
              </th>
              <th css={styles.detailVal}>
                {landingPort.name}, {landingCountry}
              </th>
              <td css={styles.detailVal}>
                {destinationPort.name}, {destCountry}
              </td>
              <td css={styles.detailEmphasizeVal}>{purchaseVolume} kg</td>
              <td css={styles.detailEmphasizeVal}>
                ${+(product.price * Number(purchaseVolume)).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <h2 css={styles.subHeading} style={{ marginBottom: 20 }}>
          YOUR INFORMATION
        </h2>

        <div css={styles.info} style={{ marginBottom: 38 }}>
          <div>
            <p css={styles.infoVal}>{company}</p>
            <p css={styles.infoVal}>{name}</p>
          </div>

          <div>
            <p css={styles.infoVal}>
              <PhoneIcon style={{ marginRight: 16 }} />
              <span>+{phone}</span>
            </p>

            <p css={styles.infoVal}>
              <EmailIcon style={{ marginRight: 16 }} />
              <span>{email}</span>
            </p>
          </div>
        </div>

        <h2 css={styles.subHeading} style={{ marginBottom: 30 }}>
          PAYMENT TERMS
        </h2>

        <div style={{ marginBottom: 8 }}>
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
            const total = paymentTerms.reduce((acc, paymentTerm) => {
              const amount = !Number.isNaN(Number(paymentTerm.amount))
                ? Number(paymentTerm.amount)
                : 0
              return acc + amount
            }, 0)

            return (
              <p style={{ textAlign: 'right' }}>
                <span style={{ marginRight: 40 }}>Total price</span>
                $ {+total.toFixed(2)}
              </p>
            )
          }}
        </FieldValue>
      </div>

      <QuoteFeatures />
    </form>
  )
}

const useStyles = makeStyles(({}: QuoteStep2Props) => {
  const detailKeyCommon = {
    padding: '0 6px 6px',
  }

  const detailValCommon = {
    fontWeight: 400,
    padding: '0 6px',
  }

  return {
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr 355px',
      gridTemplateRows: '100%',
      width: '100%',
      height: '100%',
    },
    mainSection: {
      width: '100%',
      height: '100%',
      overflowY: 'auto',
      padding: '46px 38px 40px',
    },
    details: {
      width: '100%',
      textAlign: 'left',
      marginBottom: 46,
    },
    detailKey: {
      ...detailKeyCommon,
      fontSize: 12,
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
    detailHead: {
      ...detailKeyCommon,
      fontSize: 18,
      fontWeight: 700,
      color: '#B1DA50',
    },
    detailVal: detailValCommon,
    detailEmphasizeVal: {
      ...detailValCommon,
      textAlign: 'right',
      color: '#B1DA50',
      fontWeight: 700,
      padding: '0 6px',
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
    },
    infoVal: {
      display: 'flex',
      alignItems: 'center',
      ':not(:last-of-type)': {
        marginBottom: 10,
      },
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
  }
})

export default QuoteStep2
