import { BaseInvestment } from '@/types/investment'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes } from 'react'
import Investment from './Investment'

interface InvestmentsProps extends HTMLAttributes<HTMLDivElement> {
  investments: BaseInvestment[]
}

const Investments: FC<InvestmentsProps> = (props) => {
  const styles = useStyles(props)

  const { investments, ...divProps } = props

  return (
    <div css={styles.root} {...divProps}>
      {investments.map((investment) => (
        <Investment key={investment._id} investment={investment} />
      ))}
    </div>
  )
}

const useStyles = makeStyles((props: InvestmentsProps) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 40,
  },
}))

export default Investments
