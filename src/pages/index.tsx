import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import crudDonors from 'services/donorsFirebase/crudDonors'

import { IHomeProps } from '../interfaces/interfacesHome'

import boardUser from '/public/images/board-user.svg'

import styles from 'styles/styles.module.scss'
import { IDonor } from 'services/donorsFirebase/interface'


export default function Home({ donors }: IHomeProps) {
  const donaters = JSON.parse(donors) as IDonor[]

  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas</title>
      </Head>

      <main className={styles.contentContainerStyle}>
        <Image src={boardUser} alt='Ferramenta board' width={553} height={384} />

        <section className={styles.callToActionStyle}>
          <h1>Uma ferramenta para seu dia a dia! Escreva, planeje e organize-se...</h1>

          <p>
            <span>100% Gratuita</span> e online.
          </p>
        </section>

        <div className={styles.donatersStyle}>
          {donaters.length !== 0 && <h3>Apoiadores:</h3>}

          {donaters.map((donor) => (
            <Image key={donor.image} src={donor.image} alt='Usuário 1' width={65} height={65} />
          )
          )}
        </div>
      </main>
    </>

  )
}

//TODO: deixa a página estática e recarrega a cada 1 hora
export const getStaticProps: GetStaticProps = async () => {
  const { getDonors } = crudDonors()

  const donors = JSON.stringify(await getDonors())

  return {
    props: {
      donors
    },
    revalidate: 60 * 60
  }
}