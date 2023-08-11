import { ChangeEvent, FC } from 'react'
import { makeStyles } from '../utils'
import searchIcon from '../assets/images/search-icon.png'

interface InputProps {
    type: 'text' | 'number' | 'email' | 'password'
    label?: string
    value: string | number
    name?: string
    placeholder?: string
    error?: boolean
    disabled?: boolean
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const SearchBox: FC<InputProps> = (props) => {
    const styles = useStyles(props)

    return (
        <div css={styles.inputWrapper}>
            <label htmlFor={props.label}>{props.label}</label>
            <input
                type={props.type}
                id={props.label}
                value={props.value || ''}
                name={props.name}
                placeholder={props.placeholder}
                onChange={props.onChange}
                disabled={props.disabled}
                css={styles.input}
            />
            <img css={styles.icon} src={searchIcon.src} alt="searchIcon" />
            {props.error && <p className="error">Input filed can't be empty!</p>}
        </div>
    )
}

const useStyles = makeStyles(() => ({
    inputWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid #3BA83B',
        borderRadius: 5,
        background: '#fff',
    },
    input: {
        border: 'none',
        outline: 'none',
        fontSize: 18,
        fontWeight: 500,
        padding: '10px 20px',
        background: 'transparent',
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 15,
    }
}))