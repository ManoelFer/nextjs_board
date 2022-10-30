import Head from 'next/head'
import style from 'styles/styles.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas</title>
      </Head>

      <div >
        <h1 className={style.title}>Primeiro Projeto com Next JS</h1>
      </div>
    </>

  )
}
