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
