import { FC, HTMLAttributes } from 'react'
import { BaseInvestment } from '../types'
import { Button, CountryLabel, Progress } from '../ui'
import { makeStyles } from '../utils'

interface InvestmentProps extends HTMLAttributes<HTMLDivElement> {
  investment: BaseInvestment
}

export const Investment: FC<InvestmentProps> = (props) => {
  const styles = useStyles(props)

  const {
    investment: { name, thumbnail, country, goalAmount, paidAmount },
    ...divProps
  } = props

  const progress = Math.round((paidAmount / goalAmount) * 100)

  return (
    <div css={styles.root} {...divProps}>
      <img src={thumbnail} alt="" css={styles.img} />
      <h4 css={styles.title}>{name}</h4>

      <CountryLabel css={styles.flag} countryCode={country} />

      <Progress css={styles.progress} value={progress} />

      <p css={styles.remainPrice}>$ {paidAmount}</p>

      <p css={styles.goalPrice}>pledged of ${goalAmount} goal</p>

      <Button>See Details</Button>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    fontWeight: 500,
  },
  img: {
    width: '100%',
    height: 380,
    objectFit: 'cover',
    borderRadius: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 25,
    fontWeight: 500,
    lineHeight: 1.25,
    marginBottom: 4,
  },
  flag: {
    marginBottom: 28,
  },
  progress: {
    marginBottom: 8,
  },
  remainPrice: {
    fontSize: 30,
    fontWeight: 700,
    lineHeight: 1.25,
    color: 'var(--color-primary)',
  },
  goalPrice: {
    fontWeight: 500,
    fontSize: 13,
    lineHeight: 1.25,
    color: 'rgba(5, 5, 5, 0.5)',
    marginBottom: 34,
  },
}))
