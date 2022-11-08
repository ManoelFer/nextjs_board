

import Link from 'next/link'
import Image from 'next/image'

import { SignInButton } from 'components/SignInButton'

import logo from '/public/images/logo.svg'

import styles from './styles.module.scss'

export const Header = () => {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/">
                    <Image src={logo} alt="logoMeuBoard" />
                </Link>
                <nav>
                    <Link href="/">
                        Home
                    </Link>

                    <Link href="/board">
                        Meu board
                    </Link>
                </nav>

                <SignInButton />
            </div>
        </header>
    )
}
