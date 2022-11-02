
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi'

import { SupportButton } from 'components/SupportButton'

import styles from './styles.module.scss'


export default function Board() {
    return (
        <>
            <Head>
                <title>Minhas tarefas - Board</title>
            </Head>
            <main className={styles.containerStyle}>
                <form>
                    <input type="text" placeholder="Digite sua tarefa..." />
                    <button type="submit">
                        <FiPlus size={25} color="#17181f" />
                    </button>
                </form>

                <h1>Você tem 2 tarefas!</h1>

                <section>
                    <article className={styles.taskListStyle}>
                        <p>Aprender criar projetos com Next JS e aplicando firebase como back.</p>
                        <div className={styles.actionsStyle}>
                            <div>
                                <div>
                                    <FiCalendar size={20} color="#FFB800" />
                                    <time>17 Julho 2021</time>
                                </div>
                                <button>
                                    <FiEdit2 size={20} color="#fff" />
                                    <span>Editar</span>
                                </button>
                            </div>

                            <button>
                                <FiTrash size={20} color="#ff3636" />
                                <span>Excluir</span>
                            </button>
                        </div>
                    </article>
                </section>
            </main>


            <div className={styles.vipContainerStyle}>
                <h3>Obrigado por apoiar esse projeto.</h3>
                <div>
                    <FiClock size={28} color="#fff" />
                    <time>
                        Última doação foi a 3 dias.
                    </time>
                </div>
            </div>

            <SupportButton />
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

    return {
        props: {}
    }
}