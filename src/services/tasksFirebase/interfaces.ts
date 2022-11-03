
export interface ITask {
    id?: string;
    created_at: Date;
    task: string;
    userId: string;
    name: string;
}

export interface IMethodsCRUDTasks {
    registerTask: ({ created_at, task, userId, name }: ITask) => Promise<ITask>;
}