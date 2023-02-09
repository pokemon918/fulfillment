import { FC, HTMLAttributes } from 'react'
import { BaseInvestment } from '../types'
import { Container } from '../ui'
import { makeStyles } from '../utils'
import { Investment } from './Investment'
import connectedDots from '../assets/images/connected-dots.png'
import { theme } from '../theme'
import { Investments } from './Investments'

interface InvestmentsOverviewProps extends HTMLAttributes<HTMLDivElement> {
  investments: BaseInvestment[]
}

export const InvestmentsOverview: FC<InvestmentsOverviewProps> = (props) => {
  const styles = useStyles(props)

  const { investments, ...divProps } = props

  return (
    <div css={styles.wrapper} {...divProps}>
      <div css={styles.imgWrapper}>
        <img src={connectedDots.src} />
      </div>

      <Container maxWidth="md">
        <h4 css={styles.heading} style={{ marginBottom: 34 }}>
          INVESTMENT OPPORTUNITIES
        </h4>

        <Investments investments={investments} action="view" />
      </Container>
    </div>
  )
}

const useStyles = makeStyles((props: InvestmentsOverviewProps) => ({
  wrapper: {
    position: 'relative',
    zIndex: -1,
    width: '100%',
  },
  imgWrapper: {
    position: 'absolute',
    width: '100%',
    left: 0,
    top: 0,
    overflow: 'hidden',
    zIndex: -1,
    pointerEvents: 'none',
  },
  investments: {
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
  heading: {
    fontWeight: 700,
    fontSize: 30,
    lineHeight: 1.25,
    textAlign: 'center',
    color: '#69832C',
  },
}))
