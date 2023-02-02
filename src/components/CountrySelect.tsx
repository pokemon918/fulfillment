import Select from 'react-select'
import { Controller } from 'react-hook-form'
import countriesData from '@/data/countries'
import { FC, useId, CSSProperties } from 'react'
import { Control } from 'react-hook-form'
import makeStyles from '@/utils/makeStyles'

const countries = countriesData.map((country) => ({
  value: country.code,
  label: country.name,
}))

interface CountrySelectorProps {
  className?: string
  style?: CSSProperties
  name: string
  control: Control<any>
  readOnly?: boolean
}

const CountrySelector: FC<CountrySelectorProps> = ({
  className,
  style,
  name,
  control,
  readOnly,
}) => {
  const id = useId()

  const styles = useStyles({})

  return (
    <div className={className} style={style}>
      <label css={styles.label} htmlFor={id}>
        Country
      </label>

      <div css={styles.inputWrapper}>
        <Controller
          control={control}
          name={name}
          render={({ field: { value, onChange } }) => (
            <Select
              css={styles.input}
              inputId={id}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: '#e5e7eb',
                }),
              }}
              options={countries}
              value={
                value ? countries.find((c) => c.value === value) : undefined
              }
              onChange={(value) => onChange(value?.value)}
              placeholder="Country"
              required
            />
          )}
        />
        
        {readOnly && <div css={styles.readOnly} />}
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  label: {
    fontSize: 14,
    marginBottom: 8,
    display: 'block',
  },
  input: {
    '& > div': {
      borderColor: 'red',
      border: `2px solid #CACACA`,
      padding: '1px 0',
    },
  },
  inputWrapper: {
    position: 'relative',
  },
  readOnly: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
}))

export default CountrySelector
