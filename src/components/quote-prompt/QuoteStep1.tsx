import CountryLabel from '@/ui/CountryLabel'
import Input from '@/ui/Input'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes, FormEventHandler, useState } from 'react'
import ShipIcon from '@/icons/ShipIcon'
import countries from '@/data/countries'
import Button from '@/ui/Button'
import { useFormContext } from 'react-hook-form'
import { QuoteInput, QuoteProduct } from './quote.types'
import theme from '@/theme'
import QuoteEvaluate from './QuoteEvaluate'
import useBase64 from '@/hooks/useBase64'

interface QuoteStep1Props extends HTMLAttributes<HTMLFormElement> {
  product: QuoteProduct
  onNextStep: () => void
}

const QuoteStep1: FC<QuoteStep1Props> = (props) => {
  const styles = useStyles(props)

  const blockchainBgUrl = useBase64('/images/quote-blockchain.png')

  const { control, getValues } = useFormContext<QuoteInput>()
  const [evaluating, setEvaluating] = useState(false)

  const { product, onNextStep, ...formProps } = props

  const shippingTypes = ['FOB', 'EXW', 'CFR', 'DDP'].map((option) => ({
    name: option,
    value: option,
  }))

  const countriesOptions = countries.map((country) => ({
    name: country.name,
    value: country.code,
  }))

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const { phone } = getValues()

    if (phone.length < 6) {
      alert('Please enter a valid phone number')
    } else {
      setEvaluating(true)
      // onNextStep()
    }
  }

  return (
    <>
      {!evaluating && (
        <form css={styles.root} onSubmit={handleSubmit} {...formProps}>
          <div css={styles.contactView}>
            <div css={styles.header}>
              <img css={styles.thumbnail} src={product.thumbnail} alt="" />

              <div css={styles.productDetails}>
                <div css={styles.subheader} style={{ marginBottom: 6 }}>
                  <h3 css={styles.heading}>Fresh Blueberries</h3>

                  <div css={styles.priceHead}>
                    <span style={{ marginRight: 8 }}>Price</span>
                    <b style={{ color: '#B1DA50', fontSize: 16 }}>
                      ${product.price}
                    </b>
                  </div>
                </div>
                <CountryLabel countryCode={product.country} fontWeight={400} />
              </div>
            </div>

            <div css={styles.contactForm}>
              <h3
                css={styles.heading}
                style={{ color: '#B1DA50', marginBottom: 20 }}
              >
                CONTACT FORM
              </h3>

              <Input
                name="company"
                control={control}
                css={styles.input}
                label="Company"
                placeholder="Your Company Name"
                required
              />

              <Input
                name="name"
                control={control}
                css={styles.input}
                label="Name"
                placeholder="Your Name"
                required
              />

              <Input
                name="email"
                control={control}
                css={styles.input}
                type="email"
                label="Email address"
                placeholder="Your Email address"
                required
              />

              <Input
                name="phone"
                control={control}
                css={styles.input}
                type="tel"
                label="Phone"
                required
              />
            </div>
          </div>

          <div css={styles.requirementsForm}>
            <h6 css={styles.reqTitle}>YOUR REQUIREMENTS</h6>

            <Input
              control={control}
              name="landingPort.name"
              css={styles.input}
              placeholder="Port of Loading"
              theme="dark"
              startIcon={<ShipIcon />}
              startSelect={{
                name: 'landingPort.shippingType',
                options: shippingTypes,
              }}
              endSelect={{
                name: 'landingPort.country',
                options: countriesOptions,
              }}
              required
            />

            <Input
              control={control}
              name="destinationPort.name"
              css={styles.input}
              placeholder="Port of Destination"
              theme="dark"
              startIcon={<ShipIcon />}
              startSelect={{
                name: 'destinationPort.shippingType',
                options: shippingTypes,
              }}
              endSelect={{
                name: 'destinationPort.country',
                options: countriesOptions,
              }}
              required
            />

            <Input
              control={control}
              name="purchaseVolume"
              css={styles.input}
              label="Purchase volume"
              endAdornment="kg"
              theme="dark"
              required
              pattern="[0-9]+(\.[0-9]+)?"
            />

            <Input
              control={control}
              name="needs"
              placeholder="Specify your needs"
              theme="dark"
              multiline
              rows={4}
              required
            />

            <p css={styles.note}>
              By sending a message to TRU MARKET, you agree to be contacted by
              our sales team via your specified contact information.
            </p>

            <Button type="submit" fullWidth>
              Next
            </Button>
          </div>
        </form>
      )}

      {evaluating && <QuoteEvaluate product={product} onNextStep={onNextStep} bgUrl={blockchainBgUrl} />}
    </>
  )
}

const useStyles = makeStyles(({}: QuoteStep1Props) => ({
  root: {
    padding: '42px 54px 28px',
    display: 'grid',
    gridTemplateColumns: '0.9fr 1fr',
    gap: 72,
    width: '100%',
    minHeight: '100%',
    background: '#F8F8F8',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      gridTemplateColumns: '1fr',
    },
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      paddingRight: 16,
      paddingLeft: 16,
    },
    [`@media (max-width: ${theme.widths.mobile})`]: {
      paddingRight: 0,
      paddingLeft: 0,
      paddingBottom: 0,
    },
  },
  header: {
    display: 'flex',
    marginBottom: 46,
  },
  subheader: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  heading: {
    fontSize: 18,
    fontWeight: 700,
    marginRight: 10,
    flexShrink: 0,
  },
  priceHead: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    fontSize: 14,
  },
  thumbnail: {
    flexShrink: 0,
    borderRadius: '50%',
    width: 77,
    height: 77,
    objectFit: 'cover',
    marginRight: 16,
  },
  productDetails: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  contactView: {
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      paddingRight: 16,
      paddingLeft: 16,
    },
  },
  contactForm: {
    width: '100%',
    maxWidth: '306px',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      maxWidth: 'initial',
    },
  },
  requirementsForm: {
    background: '#393939',
    padding: '26px 34px 20px',
    borderRadius: 4,
    [`@media (max-width: ${theme.widths.mobile})`]: {
      paddingRight: 16,
      paddingLeft: 16,
      borderRadius: 0,
    },
  },
  input: {
    ':not(:last-of-type)': {
      marginBottom: 22,
    },
  },
  reqTitle: {
    color: '#fff',
    fontWeight: 700,
    fontSize: 12,
    marginBottom: 24,
  },
  note: {
    fontSize: 14,
    color: '#F3F3F3',
    margin: '14px 0',
  },
}))

export default QuoteStep1
