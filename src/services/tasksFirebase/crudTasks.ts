import { addDoc, collection } from "firebase/firestore";
import { format } from 'date-fns'

import db from "services/firebaseConnection";

import { IMethodsCRUDTasks, ITask } from "./interfaces"


const crudTasks = (): IMethodsCRUDTasks => {

    async function registerTask({ created_at, task, userId, name }: ITask): Promise<ITask> {

        try {
            const docRef = await addDoc(collection(db, "tasks"), {
                created_at: created_at,
                task: task,
                userId: userId,
                name: name
            });

            const data = {
                docRef: docRef.id,
                created_at: created_at,
                created_formatted: format(new Date(), 'dd MMMM yyyy'),
                task: task,
                userId: userId,
                name: name
            }

            return data
        } catch (e) {
            console.error("Error adding document: ", e);
            throw new Error("Erro ao registrar tarefa no banco!")
        }
    }

    return {
        registerTask
    }
}

export default crudTasks