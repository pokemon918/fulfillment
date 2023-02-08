import { FC, HTMLAttributes } from 'react'
import { BaseInvestment } from '../types'
import { makeStyles } from '../utils'
import { Investment } from './Investment'

interface InvestmentsProps extends HTMLAttributes<HTMLDivElement> {
  investments: BaseInvestment[]
}

export const Investments: FC<InvestmentsProps> = (props) => {
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
