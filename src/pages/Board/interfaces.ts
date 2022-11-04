import { ITask } from "services/tasksFirebase/interfaces";

export interface IPropsServerSide {
    user: {
        name: string;
        id: string;
    }
    tasks: string
}