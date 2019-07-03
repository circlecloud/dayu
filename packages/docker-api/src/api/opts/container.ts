import * as common from './common'

export declare namespace container {
    export interface ListOpts extends common.query.FilterOpt {
        all?: boolean;
        limit?: number;
        size?: boolean;
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
}