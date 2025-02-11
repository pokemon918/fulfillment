import { keyframes } from '@emotion/react'
import { FC, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { genRandomInt, makeStyles } from '../../utils'
import { QuoteInput, QuoteProduct } from './quote.types'
import quoteBlockchain from 'common/assets/images/quote-blockchain.png'

interface QuoteEvaluateProps {
  product: QuoteProduct
  onNextStep: () => void
  bgUrl?: string | null
}

export const QuoteEvaluate: FC<QuoteEvaluateProps> = (props) => {
  const styles = useStyles(props)

  const { product, onNextStep } = props

  const { getValues } = useFormContext<QuoteInput>()

  const volume = Number(getValues().purchaseVolume)

  const originalPrice = Math.round(volume * product.price)

  const [price, setPrice] = useState(originalPrice)

  useEffect(() => {
    const interval = setInterval(() => {
      const diffRange = (30 / 100) * originalPrice
      const minRange = Math.max(5, originalPrice - diffRange)
      const maxRange = Math.max(10, originalPrice + diffRange)
      const newPrice = genRandomInt(minRange, maxRange)
      setPrice(newPrice)
    }, 200)

    const timeout = setTimeout(() => {
      onNextStep()
    }, 1600)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div css={styles.root}>
      <img
        css={styles.decorate}
        src={props.bgUrl ?? quoteBlockchain.src}
        alt=""
      />

      <div css={styles.main}>
        <div css={styles.box}>
          <span>{price} $</span>
          <div css={styles.spinner} />
        </div>

        <p css={styles.note}>A Supplier is evaluating your offer</p>
      </div>
    </div>
  )
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const useStyles = makeStyles(({}: QuoteEvaluateProps) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: '#393939',
    borderRadius: 4,
    overflow: 'hidden',
    padding: '0 16px',
  },
  decorate: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    top: 0,
    left: 0,
  },
  main: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#B1DA50',
  },
  box: {
    position: 'relative',
    width: 200,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 26,
    marginBottom: 32,
  },
  note: {
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center',
  },
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    border: '3px solid transparent',
    borderTopColor: '#B1DA50',
    borderRadius: '50%',
    width: '100%',
    height: '100%',
    animation: `${spin} 1.2s linear infinite`,
  },
}))
