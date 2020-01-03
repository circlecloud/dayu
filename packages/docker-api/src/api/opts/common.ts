export declare namespace query {
    export interface Filter<T = any> {
        filters?: string;
    }
    export interface LabelOpt {
        [key: string]: {
            [key: string]: boolean
        }
    }
}
export interface LogsOpts {
    follow?: boolean;
    stdout?: boolean;
    stderr?: boolean;
    since?: number;
    until?: number;
    timestamps?: boolean;
    tail?: number | "all";
}