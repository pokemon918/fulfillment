import theme from '@/theme'
import Button from '@/ui/Button'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes } from 'react'

interface QuoteFeaturesProps extends HTMLAttributes<HTMLDivElement> {}

const features = [
  {
    img: '/images/safety-icon.svg',
    title: 'safety',
    desc: 'We verify and qualify every supplier in the platform for you to be safe when doing an operation',
  },
  {
    img: '/images/dollar-icon.svg',
    title: 'Smart Contracts',
    desc: 'Smart Contracts allow decentralized financing of the operation through crowdfunding to make the operation possible',
  },
  {
    img: '/images/blockchain-icon.svg',
    title: 'blockchain',
    desc: 'Real-time traceability recorded in the blockchain for all parties',
  },
]

const QuoteFeatures: FC<QuoteFeaturesProps> = (props) => {
  const styles = useStyles(props)

  const { ...divProps } = props

  return (
    <div css={styles.root} {...divProps}>
      <h2 css={styles.heading}>
        WHY <br /> TRU MARKET?
      </h2>

      <div css={styles.features}>
        {features.map((feature, idx) => (
          <div css={styles.feature} key={idx}>
            <div css={styles.featureImgWrapper}>
              <img css={styles.featureImg} src={feature.img} />
            </div>

            <div css={styles.featureDetails}>
              <h3 css={styles.featureTitle}>{feature.title}</h3>
              <p css={styles.featureDesc}>{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="submit"
        style={{ background: '#fff', color: '#000' }}
        fullWidth
      >
        Send
      </Button>
    </div>
  )
}

const useStyles = makeStyles(({}: QuoteFeaturesProps) => ({
  root: {
    background: '#B1DA50',
    width: '100%',
    height: '100%',
    padding: '65px 36px 36px',
    [`@media (max-width: ${theme.widths.mobile})`]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
  },
  heading: {
    fontWeight: 700,
    fontSize: 30,
    marginBottom: 34,
    [`@media (max-width: ${theme.widths.mobile})`]: {
      fontSize: 25,
    },
  },
  features: {
    marginBottom: 40,
  },
  feature: {
    display: 'flex',
    alignItems: 'start',
    ':not(:last-of-type)': {
      marginBottom: 28,
    },
  },
  featureImgWrapper: {
    width: 41,
    marginRight: 14,
    flexShrink: 0,
  },
  featureImg: {
    marginTop: -4,
  },
  featureDetails: {},
  featureTitle: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: 14,
  },
}))

export default QuoteFeatures
