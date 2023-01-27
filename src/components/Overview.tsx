import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes } from 'react'

interface OverviewProps extends HTMLAttributes<HTMLDivElement> {}

const Overview: FC<OverviewProps> = (props) => {
  const styles = useStyles(props)

  const { ...divProps } = props

  return (
    <div css={styles.root} {...divProps}>
      <div css={styles.content}>
        <h3 css={styles.heading}>TRU Market</h3>
        <p css={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus,
          fermentum amet faucibus sed id nisi lectus at. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Lacus, fermentum amet faucibus sed
          id nisi lectus at. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Lacus, fermentum amet faucibus sed id nisi lectus at.
        </p>
      </div>

      <img css={styles.gif} src="/images/fruits-overview.gif" alt="" />
    </div>
  )
}

const useStyles = makeStyles((props: OverviewProps) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '416px 1fr',
    alignItems: 'center',
    gap: 72,
  },
  content: {},
  heading: {
    fontWeight: 500,
    fontSize: 25,
    lineHeight: 1.25,
    marginBottom: 8
  },
  desc: {
    fontSize: 18,
    lineHeight: 1.5
  },
  gif: {
    width: '100%',
  },
}))

export default Overview
