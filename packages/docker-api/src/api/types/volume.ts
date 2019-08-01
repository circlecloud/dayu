import { Labels, Options } from '../common'

export declare namespace volume {
    export interface Volume {
        CreatedAt: Date;
        Driver: string;
        Labels: Labels;
        Mountpoint: string;
        Name: string;
        Options: Options;
        Scope: string;
    }

    export interface VolumeJSON {
        Volumes: Volume[];
        Warnings?: any;
    }
}

