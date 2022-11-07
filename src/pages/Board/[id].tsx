import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import crudTasks from "services/tasksFirebase/crudTasks"
import { ITask } from "services/tasksFirebase/interfaces"
import { IPropsServerSideTaskDetails } from "./interfaces"


export default function TaskDetails({ task }: IPropsServerSideTaskDetails) {
    const taskDetails = JSON.parse(task) as ITask

    return (
        <div>
            <h1>Página de detalhes</h1>
            <h2>{taskDetails.task}</h2>
        </div>
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