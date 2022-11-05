
import { useState, FormEvent } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi'
import { toast } from 'react-toastify';

import { SupportButton } from 'components/SupportButton'

import crudTasks from 'services/tasksFirebase/crudTasks'

import styles from './styles.module.scss'

import { IPropsServerSide } from './interfaces'
import { ITask } from 'services/tasksFirebase/interfaces'
import Link from 'next/link'

export default function Board({ user, tasks }: IPropsServerSide) {
    const [input, setInput] = useState('')
    const [taskList, setTaskList] = useState<ITask[]>(JSON.parse(tasks))
    const { registerTask, deleteTask } = crudTasks()

    async function handleAddTask(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (input === "") {
            return toast.warning("Adicione alguma tarefa no campo de texto!")
        }

        try {
            const registeredTask = await registerTask({
                created_at: new Date(),
                task: input,
                userId: user.id,
                name: user.name
            });

            setInput('')
            setTaskList([...taskList, registeredTask])

            toast.success("Tarefa registrada com sucesso!")
        } catch (e) {
            setInput('')
            console.error("Error adding document: ", e);
            toast.error("Erro no cadastro da tarefa!")
        }
    }

    async function handleDeleteTask(taskId: string) {
        if (taskId) {
            const taskIsDeleted = await deleteTask(taskId)

            if (taskIsDeleted) {
                const newArrayTasks = taskList.filter(task => task.id !== taskId)
                setTaskList(newArrayTasks)
                toast.success("Tarefa excluída com sucesso!")
            } else {
                toast.error("Falha ao remover tarefa!")
            }
        }
    }


    return (
        <>
            <Head>
                <title>Minhas tarefas - Board</title>
            </Head>
            <main className={styles.containerStyle}>
                <form onSubmit={handleAddTask}>
                    <input type="text" placeholder="Digite sua tarefa..." value={input} onChange={(e) => setInput(e.target.value)} />
                    <button type="submit">
                        <FiPlus size={25} color="#17181f" />
                    </button>
                </form>

                <h1>Você tem {taskList.length} {taskList.length > 1 ? "tarefas" : "tarefa"}!</h1>

                <section>
                    {taskList.map((task: ITask) => (
                        <article className={styles.taskListStyle} key={task.id}>
                            <Link href={`/board/${task.id}`}>
                                <p>{task.task}</p>
                            </Link>

                            <div className={styles.actionsStyle}>
                                <div>
                                    <div>
                                        <FiCalendar size={20} color="#FFB800" />
                                        <time>{task.created_formatted}</time>
                                    </div>
                                    <button>
                                        <FiEdit2 size={20} color="#fff" />
                                        <span>Editar</span>
                                    </button>
                                </div>

                                <button onClick={() => handleDeleteTask(task.id || "")}>
                                    <FiTrash size={20} color="#ff3636" />
                                    <span>Excluir</span>
                                </button>
                            </div>
                        </article>
                    ))}

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
    const { getTasks } = crudTasks()

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
        name: session?.user?.name,
        //@ts-ignore
        id: session?.id
    }

    //@ts-ignore
    const tasks = JSON.stringify(await getTasks(session?.id))


    return {
        props: {
            user,
            tasks
        }
    }
}