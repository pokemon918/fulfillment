import CountryLabel from '@/ui/CountryLabel'
import Dialog from '@/ui/Dialog'
import Input from '@/ui/Input'
import Portal from '@/components/Portal'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes } from 'react'
import ShipIcon from '@/icons/ShipIcon'
import countries from '@/data/countries'
import Button from '@/ui/Button'

interface QuoteStep1Props extends HTMLAttributes<HTMLDivElement> {
  product: {
    name: string
    thumbnail: string
    country: string
  }
  onNextStep: () => void
}

const QuoteStep1: FC<QuoteStep1Props> = (props) => {
  const styles = useStyles(props)

  const { product, onNextStep, ...divProps } = props

  const shippingTypes = ['FOB', 'EXW', 'CFR', 'DDP'].map((option) => ({
    name: option,
    value: option,
  }))

  const countriesOptions = countries.map((country) => ({
    name: country.name,
    value: country.code,
  }))

  return (
    <form css={styles.root}>
      <div>
        <div css={styles.header}>
          <img css={styles.thumbnail} src={product.thumbnail} alt="" />

          <div css={styles.productDetails}>
            <h3 css={styles.heading} style={{ marginBottom: 6 }}>
              Fresh Blueberries
            </h3>
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
            css={styles.input}
            label="Company"
            placeholder="Your Company Name"
            required
          />

          <Input
            css={styles.input}
            label="Name"
            placeholder="Your Name"
            required
          />

          <Input
            css={styles.input}
            type="email"
            label="Email address"
            placeholder="Your Email address"
            required
          />

          <Input css={styles.input} type="tel" label="Phone" required />
        </div>
      </div>

      <div css={styles.requirementsForm}>
        <h6 css={styles.reqTitle}>YOUR REQUIREMENTS</h6>

        <Input
          css={styles.input}
          placeholder="Port of Loading"
          theme="dark"
          startIcon={<ShipIcon />}
          startSelect={{
            options: shippingTypes,
          }}
          endSelect={{
            options: countriesOptions,
            defaultValue: 'PE',
          }}
          required
        />

        <Input
          css={styles.input}
          placeholder="Port of Destination"
          theme="dark"
          startIcon={<ShipIcon />}
          startSelect={{
            options: shippingTypes,
          }}
          endSelect={{
            options: countriesOptions,
            defaultValue: 'PE',
          }}
          required
        />

        <Input
          css={styles.input}
          label="Purchase volume"
          endAdornment="kg"
          theme="dark"
          required
        />

        <Input
          placeholder="Specify your needs"
          theme="dark"
          multiline
          rows={5}
          required
        />

        <p css={styles.note}>
          By sending a message to TRU MARKET, you agree to be contacted by our
          sales team via your specified contact information.
        </p>

        <Button type="button" fullWidth onClick={onNextStep}>
          Send
        </Button>
      </div>
    </form>
  )
}

const useStyles = makeStyles(({}: QuoteStep1Props) => ({
  root: {
    padding: '42px 54px 32px',
    display: 'grid',
    gridTemplateColumns: '0.8fr 1fr',
    gap: 72,
  },
  header: {
    display: 'flex',
    marginBottom: 46,
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
  heading: {
    fontSize: 18,
    fontWeight: 700,
  },
  contactForm: {
    width: '100%',
    maxWidth: '306px',
  },
  requirementsForm: {
    background: '#393939',
    padding: '26px 34px 20px',
    borderRadius: 4,
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
