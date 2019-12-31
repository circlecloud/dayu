import { Labels, Options, StringMap, Annotations } from '../common'

export declare namespace network {
    export interface Config {
        Subnet: string;
        Gateway: string;
    }

    export interface IPAM {
        Driver: string;
        Options?: any;
        Config: Config[];
    }

    export interface ConfigFrom {
        Network: string;
    }

    export interface EndpointResource {
        Name: string;
        EndpointID: string;
        MacAddress: string;
        IPv4Address: string;
        IPv6Address: string;
    }

    export interface Containers {
        [key: string]: EndpointResource;
    }

    export interface PeerInfo {
        Name: string;
        IP: string;
    }

    // Task carries the information about one backend task
    export interface Task {
        Name: string;
        EndpointID: string;
        EndpointIP: string;
        Info: StringMap;
    }

    export interface ServiceInfo {
        VIP: string;
        Ports: string;
        LocalLBIndex: number;
        Tasks: Task;
    }

    export interface NetworkResource extends Annotations {
        Id: string;
        Created: string;
        Scope: string;
        Driver: string;
        EnableIPv6: boolean;
        IPAM: IPAM;
        Internal: boolean;
        Attachable: boolean;
        Ingress: boolean;
        ConfigFrom: ConfigFrom;
        ConfigOnly: boolean;
        Containers?: Containers;
        Options: Options;
        Peers: network.PeerInfo[];
        Services: network.ServiceInfo[];
    }
}
