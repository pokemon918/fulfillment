import ReactSelect, { GroupBase } from 'react-select'
import { useId, CSSProperties, RefAttributes, ReactElement } from 'react'
import makeStyles from '@/utils/makeStyles'
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager'
import SelectType from 'react-select/dist/declarations/src/Select'
import { Control, Controller } from 'react-hook-form'

type StateManagedSelect = <
  Option extends {
    value: string | number
    label: string
  } = {
    value: string | number
    label: string
  },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: Omit<
    StateManagerProps<Option, IsMulti, Group> &
      RefAttributes<SelectType<Option, IsMulti, Group>>,
    'inputId' | 'instanceId' | 'value' | 'onChange'
  > & {
    name: string
    control: Control<any>
    className?: string
    style?: CSSProperties
    label?: string
    readOnly?: boolean
    options: {
      value: string
      label: string
    }[]
  }
) => ReactElement

const Select: StateManagedSelect = ({
  className,
  name,
  style,
  readOnly,
  label,
  control,
  options,
  ...rest
}) => {
  const id = useId()

  const styles = useStyles({})

  return (
    <div className={className} style={style}>
      <label css={styles.label} htmlFor={id}>
        {label}
      </label>

      <div css={styles.inputWrapper}>
        <Controller
          control={control}
          name={name}
          render={({ field: { value, onChange } }) => (
            <ReactSelect
              css={styles.input}
              inputId={id}
              instanceId={id}
              formatOptionLabel={({ label }) => label}
              options={options}
              // @ts-ignore
              value={
                value
                  ? value instanceof Array
                    ? // @ts-ignore
                      value.map((v) => options.find((c) => c.value === v))
                    : // @ts-ignore
                      options.find((c) => c.value === value)
                  : undefined
              }
              onChange={(value) =>
                value instanceof Array
                  ? onChange(value.map((v) => v.value))
                  : // @ts-ignore
                    onChange(value?.value)
              }
              {...rest}
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

export default Select
