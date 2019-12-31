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