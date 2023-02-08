import { countries } from '../data'
import { makeStyles } from '../utils'
import { FC, HTMLAttributes, useMemo } from 'react'

interface CountryLabelProps extends HTMLAttributes<HTMLDivElement> {
  countryCode: string
  fontWeight?: number
  address?: string
}

export const CountryLabel: FC<CountryLabelProps> = (props) => {
  const styles = useStyles(props)

  const { countryCode, fontWeight, address, ...divProps } = props

  const country = useMemo(
    () => countries.find((c) => c.code === countryCode),
    [countryCode]
  )

  if (!country) return null

  return (
    <div css={styles.root} {...divProps}>
      <i
        className={`fi fi-${countryCode.toLowerCase()}`}
        css={styles.flagIcon}
      ></i>
      <span>{(address ? `${address}, ` : '') + country.name}</span>
    </div>
  )
}

const useStyles = makeStyles(({ fontWeight = 600 }: CountryLabelProps) => ({
  root: {
    fontWeight,
  },
  flagIcon: {
    fontSize: 18,
    marginRight: 5,
  },
}))
