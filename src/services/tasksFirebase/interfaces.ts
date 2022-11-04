export interface ITask {
    id?: string;
    created_at: Date;
    created_formatted?: string;
    task: string;
    userId: string;
    name: string;
}

export interface IMethodsCRUDTasks {
    registerTask: ({ created_at, task, userId, name }: ITask) => Promise<ITask>;
    getTasks: (userId: string) => Promise<any>;
}