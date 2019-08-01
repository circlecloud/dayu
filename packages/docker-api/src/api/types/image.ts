import { Labels } from '../common'

export declare namespace image {
    export interface Image {
        Containers: number;
        Created: number;
        Id: string;
        Labels: Labels;
        ParentId: string;
        RepoDigests: string[];
        RepoTags: string[];
        SharedSize: number;
        Size: number;
        VirtualSize: number;
    }
}

