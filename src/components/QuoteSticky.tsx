import useSameState from '@/hooks/useSameState'
import Button from '@/ui/Button'
import makeStyles from '@/utils/makeStyles'
import { FC, useEffect } from 'react'

interface QuoteStickyProps {
  onClickGetQuote: () => void
}

const QuoteSticky: FC<QuoteStickyProps> = (props) => {
  const styles = useStyles(props)
  const [show, setShow] = useSameState(false)

  const { onClickGetQuote } = props

  useEffect(() => {
    const updateShow = () => setShow(window.scrollY > 500)

    updateShow()
    window.addEventListener('scroll', updateShow)
    return () => window.removeEventListener('scroll', updateShow)
  }, [])

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

      <Button fullWidth onClick={onClickGetQuote}>
        Get a Quote
      </Button>
    </div>
  )
}

const useStyles = makeStyles(({}: QuoteStickyProps) => ({
  root: {
    background: '#000',
    color: '#fff',
    position: 'fixed',
    bottom: 35,
    right: 35,
    width: 370,
    padding: '50px 60px',
    transition: 'transform 0.2s ease-out',
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
}))

export default QuoteSticky
