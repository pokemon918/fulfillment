import { FC } from 'react'
import { useSameState } from '../hooks'
import { theme } from '../theme'
import { Button } from '../ui'
import { makeStyles } from '../utils'

interface QuoteStickyProps {
  onClickGetQuote: () => void
}

export const QuoteSticky: FC<QuoteStickyProps> = (props) => {
  const styles = useStyles(props)
  const [show, setShow] = useSameState(true)

  const { onClickGetQuote } = props

  // useEffect(() => {
  //   const updateShow = () => setShow(window.scrollY > 500)

  //   updateShow()
  //   window.addEventListener('scroll', updateShow, { passive: true })
  //   return () => window.removeEventListener('scroll', updateShow)
  // }, [])

  return (
    <div
      css={styles.root}
      style={{
        transform: show ? 'translateY(0)' : 'translateY(calc(100% + 35px))',
      }}
    >
      <h2 css={styles.heading}>
        Are you interested in this market? Get a quote now.
      </h2>

      <Button css={styles.btn} fullWidth onClick={onClickGetQuote}>
        Get a Quote
      </Button>
    </div>
  )
}

const useStyles = makeStyles(({}: QuoteStickyProps) => ({
  root: {
    background: '#b1da51',
    color: '#333',
    borderRadius:'10px',
    position: 'fixed',
    bottom: 35,
    right: 35,
    width: 370,
    padding: 30,
    transition: 'transform 0.2s ease-out',
    textAlign: 'center',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      width: '100%',
      bottom: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      textAlign: 'left',
    },
  },
  btn: {
    background:'#fff',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      flexShrink: 0,
      width: 'initial',
    },
    [`@media (max-width: ${theme.widths.mobile})`]: {
      fontSize: 14,
    },
    [`@media (max-width: ${theme.widths.mobileXs})`]: {
      minWidth: 'initial',
      padding: 10,
    },
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
    [`@media (max-width: ${theme.widths.tablet})`]: {
      fontSize: 16,
      marginBottom: 0,
      marginRight: 16,
      fontWeight: 400,
    },
    [`@media (max-width: ${theme.widths.mobile})`]: {
      fontSize: 14,
    },
  },
}))
