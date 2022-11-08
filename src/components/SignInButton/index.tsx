import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image'

import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

export const SignInButton = () => {
    const { data: session } = useSession()

    return session ? (
        <button
            type='button'
            className={styles.signInButtonStyles}
            onClick={() => signOut()}
        >
            <Image src={session.user?.image || "https://sujeitoprogramador.com/steve.png"} alt={session.user?.name || ""} width={35} height={35} />
            Olá {session.user?.name}
            <FiX color='#737380' className={styles.closeIconStyle} />
        </button>

    ) : (
        <button
            type='button'
            className={styles.signInButtonStyles}
            onClick={() => signIn('github')}
        >
            <FaGithub color='#ffb800' />
            Entrar com github
        </button>
    )
}
