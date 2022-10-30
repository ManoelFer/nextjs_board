
import Link from 'next/link'
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

                    <Link href="/board">
                        Meu board
                    </Link>
                </nav>


                <button>
                    Entrar com github
                </button>
            </div>
        </header>
    )
}
