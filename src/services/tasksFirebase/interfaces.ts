import { DocumentData } from "firebase/firestore";

export interface ITask {
    id?: string;
    created_at: Date;
    created_formatted?: string;
    task: string;
    userId: string;
    name: string;
}

export interface ITaskEdit {
    id: string;
    task: string;
}

export interface IMethodsCRUDTasks {
    registerTask: ({ created_at, task, userId, name }: ITask) => Promise<ITask>;
    getTasks: (userId: string) => Promise<DocumentData[] | []>;
    deleteTask: (taskId: string) => Promise<boolean>;
    editTask: ({ id, task }: ITaskEdit) => Promise<void>;
    getTaskByDocId: (docId: string) => Promise<ITask | null>;
}