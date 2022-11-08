import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'

import { toast } from 'react-toastify'
import { PayPalButtons } from '@paypal/react-paypal-js'

import { IDonateProps } from './interface'

import crudDonors from 'services/donorsFirebase/crudDonors'

import rocket from '/public/images/rocket.svg'

import styles from './styles.module.scss'


export default function Donate({ user }: IDonateProps) {
    const [isVip, setVip] = useState<boolean>(false)
    const { registerDonor } = crudDonors()

    async function handleSaveDonate() {
        try {
            await registerDonor({ donate: true, lastDonate: new Date(), image: user.image, userId: user.id })
            setVip(true)
        } catch (error) {
            toast.error("Falha ao adicionar doador no banco!")
        }

    }

    return (
        <>
            <Head>
                <title>Ajude a plataforma board ficar online</title>
            </Head>

            <main className={styles.containerStyles}>
                <Image src={rocket} alt='Seja Apoiador' />

                {isVip && (
                    <div className={styles.vipStyles}>
                        <Image src={user.image} alt='Foto do Apoiador' width={50} height={50} />
                        <span>Parabéns você é um novo apoiador!</span>
                    </div>
                )}


                <h1>Seja um apoiador deste projeto 🏆</h1>
                <h3>Contribua com apenas <span>R$ 1,00</span></h3>
                <strong>Apareça na nossa home, tenha funcionalidades exclusivas!</strong>

                <PayPalButtons
                    createOrder={(_data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: '1'
                                }
                            }]
                        })
                    }}
                    //@ts-ignore
                    onApprove={(_data, actions) => {
                        return actions.order?.capture().then((details) => {
                            const name = details.payer?.name?.given_name;
                            toast.success(`A transação feita por ${name}, está completa!`);
                            handleSaveDonate()
                        })
                    }}
                />
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