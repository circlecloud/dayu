export interface Labels {
    [key: string]: string
}
export interface Function {
    name: string;
    image: string;
    invocationCount: number;
    replicas: number;
    envProcess: string;
    availableReplicas: number;
    labels: Labels;
    annotations?: any;
}