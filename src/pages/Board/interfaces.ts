import { ITask } from "services/tasksFirebase/interfaces";

export interface IPropsServerSideBoard {
    user: {
        name: string;
        id: string;
    }
    tasks: string
}

export interface IPropsServerSideTaskDetails {
    task: string
}