export interface ObjectMap {
    [key: string]: {};
}
export interface StringMap {
    [key: string]: string;
}
export type PortSet = ObjectMap
export type Options = StringMap
export type Config = StringMap
export type Labels = StringMap
export type Ports = StringMap | ObjectMap
export interface Version {
    Index: number;
}
export interface Meta {
    Version: Version;
    CreatedAt: string;
    UpdatedAt: string;
}
export interface Annotations {
    Name: string;
    Labels: Labels;
}
export interface Driver {
    Name: string;
    Options: Options;
}