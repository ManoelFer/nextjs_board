import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import { FiCalendar } from "react-icons/fi"
import crudTasks from "services/tasksFirebase/crudTasks"
import { ITask } from "services/tasksFirebase/interfaces"
import { IPropsServerSideTaskDetails } from "./interfaces"

import styles from "./task.module.scss"


export default function TaskDetails({ task }: IPropsServerSideTaskDetails) {
    const taskDetails = JSON.parse(task) as ITask

    return (
        <>
            <Head>
                <title>Detalhes da sua tarefa</title>
            </Head>

            <article className={styles.containerStyle}>
                <div className={styles.actionsStyle}>
                    <div>
                        <FiCalendar size={30} color="#fff" />
                        <span>Tarefa criada:</span>
                        <time>{taskDetails.created_formatted}</time>
                    </div>
                </div>
                <p>{taskDetails.task}</p>
            </article>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req })

    const { getTaskByDocId } = crudTasks()
    //@ts-ignore
    const { id } = params

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

    const task = await getTaskByDocId(String(id))

    return {
        props: {
            task: JSON.stringify(task)
        }
    }
}