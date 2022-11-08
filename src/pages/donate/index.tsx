import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'

import { IDonateProps } from './interface'

import styles from './styles.module.scss'

export default function Donate({ user }: IDonateProps) {

    return (
        <>
            <Head>
                <title>Ajude a plataforma board ficar online</title>
            </Head>

            <main className={styles.containerStyles}>
                <img src='/images/rocket.svg' alt='Seja Apoiador' />

                <div className={styles.vipStyles}>
                    <img src={user.image} alt='Foto do Apoiador' />
                    <span>Parabéns você é um novo apoiador!</span>
                </div>

                <h1>Seja um apoiador deste projeto 🏆</h1>
                <h3>Contribua com apenas <span>R$ 1,00</span></h3>
                <strong>Apareça na nossa home, tenha funcionalidades exclusivas!</strong>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    //@ts-ignore
    if (!session?.id) {
        //Se não estiver logado redireciona
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const user = {
        //@ts-ignore
        id: session?.id,
        name: session?.user?.name,
        //@ts-ignore
        image: session?.user.image
    }

    return {
        props: {
            user
        }
    }
}