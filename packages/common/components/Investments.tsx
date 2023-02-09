import { FC, HTMLAttributes } from 'react'
import { BaseInvestment } from '../types'
import { makeStyles } from '../utils'
import { Investment } from './Investment'
import { theme } from '../theme'

interface InvestmentsProps extends HTMLAttributes<HTMLDivElement> {
  investments: BaseInvestment[]
  action: 'view' | 'update'
}

export const Investments: FC<InvestmentsProps> = (props) => {
  const styles = useStyles(props)

  const { investments, action, ...divProps } = props

  return (
    <div css={styles.root}>
      {investments.map((investment) => (
        <Investment
          key={investment._id}
          investment={investment}
          href={
            action === 'update'
              ? `/investments/${investment._id}/update`
              : `/investments/${investment._id}`
          }
          actionText={action === 'update' ? 'Update' : 'See Details'}
        />
      ))}
    </div>
  )
}

const useStyles = makeStyles((props: InvestmentsProps) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '48px 24px',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [`@media (max-width: ${theme.widths.mobile})`]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
}))
