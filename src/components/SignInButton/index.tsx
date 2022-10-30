import styles from './styles.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export const SignInButton = () => {

    const isLogged = true

    return isLogged ? (
        <button
            type='button'
            className={styles.signInButtonStyles}
            onClick={() => { }}
        >
            <img src='https://sujeitoprogramador.com/steve.png' alt='' />
            Olá Manoel
            <FiX color='#737380' className={styles.closeIconStyle} />
        </button>

    ) : (
        <button
            type='button'
            className={styles.signInButtonStyles}
            onClick={() => { }}
        >
            <FaGithub color='#ffb800' />
            Entrar com github
        </button>
    )
}
