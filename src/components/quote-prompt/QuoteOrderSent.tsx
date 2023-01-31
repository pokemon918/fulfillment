import Button from '@/ui/Button'
import makeStyles from '@/utils/makeStyles'
import { FC } from 'react'
import { QuoteProduct } from './quote.types'

interface QuoteOrderSentProps {
  product: QuoteProduct
  onNextStep: () => void
}

const QuoteOrderSent: FC<QuoteOrderSentProps> = (props) => {
  const styles = useStyles(props)

  return (
    <div css={styles.root}>
      <div css={styles.info}>
        <h2 css={styles.heading}>
          Congratulations, your order has been fulfilled
        </h2>
        <p css={styles.desc}>
          Our sales team will contact you within a few days or shortly
        </p>
      </div>

      <div css={styles.gifWrapper}>
        <img css={styles.gif} src="/gifs/done-congratulation.gif" alt="" />
      </div>

      <div css={styles.footer}>
        <Button style={{ padding: '16px 42px' }}>View Transaction</Button>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({}: QuoteOrderSentProps) => ({
  root: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    padding: '100px 30px',
    background: '#F8F8F8',
  },
  heading: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 40,
  },
  info: {
    position: 'relative',
    zIndex: 2,
  },
  gifWrapper: {
    position: 'relative',
    zIndex: 1,
    top: -44,
    left: -2,
    width: '100%',
    maxWidth: 495,
    margin: '0 auto',
    height: 354,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  gif: {},
  footer: {
    position: 'relative',
    zIndex: 2,
    top: -80,
  },
  desc: {
    fontSize: 20,
  },
}))

export default QuoteOrderSent
