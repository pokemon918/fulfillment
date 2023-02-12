import { FC, HTMLAttributes } from 'react'
import { BaseInvestment } from '../types'
import { Button, CountryLabel, Progress } from '../ui'
import { makeStyles } from '../utils'
import Link from 'next/link'

interface InvestmentProps extends HTMLAttributes<HTMLAnchorElement> {
  investment: BaseInvestment
  href: string
  actionText?: string
  squareImg?: boolean
}

export const Investment: FC<InvestmentProps> = (props) => {
  const styles = useStyles(props)

  const {
    investment: { name, thumbnail, country, goalAmount, paidAmount },
    actionText = 'See Details',
    href,
    squareImg,
    ...anchorProps
  } = props

  const progress = Math.round((paidAmount / goalAmount) * 100)

  return (
    <Link href={href} css={styles.root} {...anchorProps}>
      <div
        css={styles.img}
        style={{ backgroundImage: `url(${thumbnail})` }}
        data-square-img={squareImg}
      />
      <h4 css={styles.title}>{name}</h4>

      <CountryLabel css={styles.flag} countryCode={country} />

      <Progress css={styles.progress} value={progress} />

      <p css={styles.remainPrice}>$ {paidAmount}</p>

      <p css={styles.goalPrice}>pledged of ${goalAmount} goal</p>

      <Button style={{ minWidth: 146, padding: 11 }}>{actionText}</Button>
    </Link>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    fontWeight: 500,
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
  },
  img: {
    width: '100%',
    height: 380,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: 16,
    marginBottom: 24,
    '&[data-square-img="true"]': {
      width: 258,
      height: 258,
    },
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
