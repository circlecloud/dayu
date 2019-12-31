import { Meta, Annotations } from '../common'

export declare namespace config {
    export interface Spec extends Annotations {
        Data: string;
    }
    export interface Config extends Meta {
        ID: string;
        Spec: Spec;
    }
}
