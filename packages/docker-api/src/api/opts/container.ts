import * as common from './common'

export declare namespace container {
    export interface ListOpts extends common.query.Filter {
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
    export namespace exec {
        export interface Create {
            AttachStdin?: boolean;
            AttachStdout?: boolean;
            AttachStderr?: boolean;
            DetachKeys?: string;
            Tty?: boolean;
            Cmd?: string[];
            Env?: string[];
            Privileged?: boolean;
            User?: string;
            WorkingDir?: string;
        }
        export interface Start {
            Detach?: boolean;
            Tty?: boolean;
        }
        export interface Resize {
            h?: number;
            w?: number;
        }
    }
}