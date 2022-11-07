import { doc, addDoc, updateDoc, getDocs, getDoc, deleteDoc, collection, query, orderBy, DocumentData, where } from "firebase/firestore";
import { format } from 'date-fns'

import db from "services/firebaseConnection";

import { IMethodsCRUDTasks, ITask, ITaskEdit } from "./interfaces"


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

    async function getTasks(userId: string): Promise<DocumentData[] | []> {
        let listTasks: Array<DocumentData> = []

        try {
            const q = query(collection(db, "tasks"), where("userId", "==", userId), orderBy("created_at", "asc"));

            const tasks = await getDocs(q);

            tasks.forEach((doc) => {
                listTasks.push({
                    id: doc.id,
                    created_formatted: format(new Date(), 'dd MMMM yyyy'),
                    ...doc.data()
                })
            });

            return listTasks
        } catch (e) {
            console.error("Error adding document: ", e);
            throw new Error("Erro ao trazer as tarefas do banco!")
        }
    }

    async function getTaskByDocId(docId: string): Promise<ITask | null> {

        try {
            const docRef = doc(db, "tasks", docId);

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const { userId, name, task, created_at } = docSnap.data()

                const taskData = {
                    id: docSnap.id,
                    userId: userId,
                    name: name,
                    task: task,
                    created_formatted: format(created_at.toDate(), 'dd MMMM yyyy'),
                    created_at: created_at
                }

                return taskData || null
            } else {
                throw new Error("Tarefa não encontrada!")
            }
        } catch (e) {
            console.error("Error find task document: ", e);
            throw new Error("Erro ao trazer a tarefa do banco!")
        }
    }

    async function deleteTask(taskId: string): Promise<boolean> {
        try {
            await deleteDoc(doc(db, "tasks", taskId));
            return true
        } catch (error) {
            console.log('("Falha ao remover tarefa! Erro original >> ', error)
            return false;
        }
    }

    async function editTask({ id, task }: ITaskEdit): Promise<void> {
        const taskRef = doc(db, "tasks", id || "");

        try {
            await updateDoc(taskRef, {
                task: task
            });

        } catch (e) {
            console.error("Error update document: ", e);
            throw new Error("Erro ao editar tarefa no banco!")
        }
    }

    return {
        registerTask,
        getTasks,
        getTaskByDocId,
        deleteTask,
        editTask,
    }
}

export default crudTasks