import ReactCreatableSelect from 'react-select/creatable'
import { CreatableProps } from 'react-select/creatable'
import {
  useId,
  CSSProperties,
  RefAttributes,
  ReactElement,
  useRef,
  MutableRefObject,
} from 'react'
import { makeStyles } from '../utils'
import SelectType from 'react-select/dist/declarations/src/Select'
import { Control, Controller } from 'react-hook-form'
import { GroupBase } from 'react-select'
import { useForceUpdate } from '../hooks'

type CreatableSelectT = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: Omit<
    CreatableProps<Option, IsMulti, Group> &
      RefAttributes<SelectType<Option, IsMulti, Group>>,
    'onCreateOption'
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
    onCreateOption?: (fns: {
      newOption: string
      optionsRef: MutableRefObject<
        {
          label: string
          value: string
        }[]
      >
      onChange: (v: any) => void
    }) => void
  }
) => ReactElement

export const CreatableSelect: CreatableSelectT = ({
  className,
  name,
  style,
  readOnly,
  label,
  control,
  options: initialOptions,
  onCreateOption,
  ...rest
}) => {
  const id = useId()

  const styles = useStyles({})

  const options = useRef<
    {
      label: string
      value: string
    }[]
  >(initialOptions)

  const forceUpdate = useForceUpdate()

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
            <ReactCreatableSelect
              css={styles.input}
              inputId={id}
              instanceId={id}
              // @ts-ignore
              options={options.current}
              // @ts-ignore
              value={
                value
                  ? value instanceof Array
                    ? // @ts-ignore
                      value.map((v) =>
                        options.current.find((c) => c.value === v)
                      )
                    : // @ts-ignore
                      options.current.find((c) => c.value === value)
                  : undefined
              }
              onCreateOption={(newOption) => {
                if (onCreateOption) {
                  return onCreateOption({
                    newOption,
                    optionsRef: options,
                    onChange,
                  })
                }

                options.current = [
                  ...options.current,
                  { label: newOption, value: newOption },
                ]

                onChange([...value, newOption])
              }}
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
