import Link from 'next/link'
import styles from './styles.module.scss'

export const SupportButton = () => {
    return (
        <div className={styles.donateContainerStyle}>
            <Link href="/donate">
                <button>Apoiar</button>
            </Link>
        </div>
    )
}
