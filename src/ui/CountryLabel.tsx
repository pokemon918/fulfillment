import countries from '@/data/countries'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes, useMemo } from 'react'

interface CountryLabelProps extends HTMLAttributes<HTMLDivElement> {
  countryCode: string
}

const CountryLabel: FC<CountryLabelProps> = (props) => {
  const styles = useStyles(props)

  const { countryCode, ...divProps } = props

  const country = useMemo(
    () => countries.find((c) => c.code === countryCode),
    [countryCode]
  )

  if (!country) return null

  return (
    <div css={styles.root} {...divProps}>
      <i className={`fi fi-${countryCode.toLowerCase()}`} css={styles.flagIcon}></i>
      <span>{country.name}</span>
    </div>
  )
}

const useStyles = makeStyles((props: CountryLabelProps) => ({
  root: {
    fontWeight: 600
  },
  flagIcon: {
    fontSize: 18,
    marginRight: 5,
  }
}))

export default CountryLabel
