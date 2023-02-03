import makeStyles from '@/utils/makeStyles'
import { ChangeEventHandler, FC, HTMLAttributes, useId, useState } from 'react'
import { Control, Controller } from 'react-hook-form'

export interface CheckboxesProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  name: string
  othersName: string
  control: Control<any>
  options: string[]
}

const InternalCheckbox: FC<{
  name: string
  option: string
  onChange: ChangeEventHandler<HTMLInputElement>
  checked: boolean
}> = ({ name, option, onChange, checked }) => {
  const styles = useStyles({})

  const id = useId()

  return (
    <div css={styles.inputWrapper}>
      <input
        css={styles.input}
        id={id}
        type="checkbox"
        onChange={onChange}
        checked={checked}
        name={name}
      />

      <label css={styles.label} htmlFor={id}>
        {option}
      </label>
    </div>
  )
}

const Checkboxes: FC<CheckboxesProps> = (props) => {
  const styles = useStyles(props)

  const { label, name, control, othersName, options, ...divProps } = props

  return (
    <div {...divProps}>
      <p css={styles.bigLabel}>{label}</p>
      <Controller
        name={name}
        control={control}
        render={({ field: { name, value: untypedValue, onChange } }) => {
          const value = untypedValue as string[]

          const handleChange = (option: string) => {
            if (value.includes(option)) {
              onChange(value.filter((v: any) => v !== option))
            } else {
              onChange([...value, option])
            }
          }

          const othersIndex = value.findIndex((v) => v.startsWith('Others:'))

          const othersTitle = 'Others: '

          return (
            <>
              {options.map((option, idx) => (
                <div key={idx} css={styles.boxWrapper}>
                  <InternalCheckbox
                    name={name}
                    option={option}
                    onChange={() => handleChange(option)}
                    checked={value.includes(option)}
                  />
                </div>
              ))}

              <div css={styles.boxWrapper}>
                <InternalCheckbox
                  name={name}
                  option="Others: (input text)"
                  onChange={() => {
                    if (othersIndex > -1) {
                      onChange(value.filter((v) => !v.startsWith(othersTitle)))
                    } else {
                      onChange([...value, othersTitle])
                    }
                  }}
                  checked={othersIndex > -1}
                />

                {othersIndex > -1 && (
                  <input
                    style={{ display: 'flex', marginTop: 4 }}
                    type="text"
                    css={styles.inputText}
                    value={value[othersIndex].slice(othersTitle.length)}
                    onChange={(e) => {
                      const slicedValue = [...value]
                      slicedValue[othersIndex] = othersTitle + e.target.value
                      onChange(slicedValue)
                    }}
                    required
                  />
                )}
              </div>

              <div css={styles.boxWrapper}>
                <InternalCheckbox
                  name={name}
                  option="None"
                  onChange={() => handleChange('None')}
                  checked={value.includes('None')}
                />
              </div>
            </>
          )
        }}
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  inputWrapper: {
    display: 'flex',
  },
  input: {
    cursor: 'pointer',
    marginRight: 8,
  },
  boxWrapper: {
    marginBottom: 6,
  },
  inputText: {
    width: '100%',
    fontFamily: 'inherit',
    padding: '6px 12px',
    color: 'inherit',
    background: 'transparent',
    resize: 'none',
    fontSize: 16,
    border: '2px solid #CACACA',
    borderRadius: 4,
    '::placeholder': {
      color: '#AEAEAE',
    },
  },
  bigLabel: {
    cursor: 'pointer',
    fontSize: 14,
    marginBottom: 8,
  },
  label: {
    cursor: 'pointer',
  },
}))

export default Checkboxes
