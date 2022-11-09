export interface IPropsServerSideBoard {
    user: {
        name: string;
        id: string;
        vip: boolean;
        lastDonate: Date;
    }
    tasks: string
}

export interface IPropsServerSideTaskDetails {
    task: string
}