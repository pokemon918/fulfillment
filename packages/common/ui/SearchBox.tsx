import { ChangeEvent, FC } from 'react'
import { makeStyles } from '../utils'

interface InputProps {
    type?: 'text' | 'number' | 'email' | 'password'
    label?: string
    value?: string | number
    name?: string
    placeholder?: string
    error?: boolean
    disabled?: boolean
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const SearchBox: FC<InputProps> = (props) => {
    const styles = useStyles(props)
    return (
        <>
            <label htmlFor={props.label}>{props.label}</label>
            <input
                type={props.type}
                id={props.label}
                value={props.value}
                name={props.name}
                placeholder={props.placeholder}
                onChange={props.onChange}
                disabled={props.disabled}
                css={styles.input}
            />
            {props.error && <p className="error">Input filed can't be empty!</p>}
        </>
    )
}

const useStyles = makeStyles(() => ({
    input: {
        border: '1px solid #3BA83B',
        borderRadius: 5,
        fontSize: 18,
        fontWeight: 500,
        padding: '10px 20px',
    }
}))