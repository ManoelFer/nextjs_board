

import Link from 'next/link'

import { SignInButton } from 'components/SignInButton'

import styles from './styles.module.scss'

export const Header = () => {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/">
                    <img src="/images/logo.svg" alt="logoMeuBoard" />
                </Link>
                <nav>
                    <Link href="/">
                        Home
                    </Link>

                    <Link href="/Board">
                        Meu board
                    </Link>
                </nav>

                <SignInButton />
            </div>
        </header>
    )
}
