import { FC } from 'react'
import { theme } from '../../theme'
import { Button } from '../../ui'
import { makeStyles } from '../../utils'
import { QuoteProduct } from './quote.types'
import doneCongratsGif from 'common/assets/images/done-congrats.gif'

interface QuoteOrderSentProps {
  product: QuoteProduct
  onNextStep: () => void
}

export const QuoteOrderSent: FC<QuoteOrderSentProps> = (props) => {
  const styles = useStyles(props)

  const { onNextStep } = props

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
        <img css={styles.gif} src={doneCongratsGif.src} alt="" />
      </div>

      <div css={styles.footer}>
        <Button onClick={onNextStep} style={{ padding: '16px 42px' }}>
          View Transaction
        </Button>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({}: QuoteOrderSentProps) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    padding: '100px 30px',
    background: '#F8F8F8',
    [`@media (max-width: ${theme.widths.mobile})`]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
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
