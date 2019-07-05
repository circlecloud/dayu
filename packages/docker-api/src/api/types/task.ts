import { Options, Labels } from '../common'

export namespace task {

    export interface Version {
        Index: number;
    }

    export interface Privileges {
        CredentialSpec?: any;
        SELinuxContext?: any;
    }

    export interface DriverConfig {
        Options: Options;
    }

    export interface VolumeOptions {
        Labels: Labels;
        DriverConfig: DriverConfig;
    }

    export interface Mount {
        Type: string;
        Source: string;
        Target: string;
        VolumeOptions: VolumeOptions;
        ReadOnly?: boolean;
    }

    export interface File {
        Name: string;
        UID: string;
        GID: string;
        Mode: number;
    }

    export interface Secret {
        File: File;
        SecretID: string;
        SecretName: string;
    }

    export interface ContainerSpec {
        Image: string;
        Labels: Labels;
        Privileges: Privileges;
        Mounts: Mount[];
        Isolation: string;
        Env: string[];
        User: string;
        Args: string[];
        Secrets: Secret[];
    }

    export interface Limits {
        MemoryBytes: any;
        NanoCPUs?: number;
    }

    export interface Reservations {
        MemoryBytes: any;
        NanoCPUs?: number;
    }

    export interface Resources {
        Limits: Limits;
        Reservations: Reservations;
    }

    export interface Platform {
        Architecture: string;
        OS: string;
    }

    export interface Placement {
        Constraints: string[];
        Platforms: Platform[];
    }

    export interface Network {
        Target: string;
        Aliases: string[];
    }

    export interface RestartPolicy {
        Condition: string;
        MaxAttempts: number;
        Delay?: number;
        Window?: number;
    }


    export interface LogDriver {
        Name: string;
        Options: Options;
    }

    export interface Spec {
        ContainerSpec: ContainerSpec;
        Resources: Resources;
        Placement: Placement;
        Networks: Network[];
        ForceUpdate: number;
        RestartPolicy: RestartPolicy;
        LogDriver: LogDriver;
    }

    export interface ContainerStatus {
        ContainerID: string;
        PID: number;
        ExitCode: number;
    }

    export interface Port {
        Protocol: string;
        TargetPort: number;
        PublishedPort: number;
        PublishMode: string;
    }

    export interface PortStatus {
        Ports: Port[];
    }

    export interface Status {
        Timestamp: string;
        State: string;
        Message: string;
        Err: string;
        ContainerStatus: ContainerStatus;
        PortStatus: PortStatus;
    }

    export interface DriverConfiguration {
        Name: string;
    }

    export interface Driver {
        Name: string;
    }

    export interface Config {
        Subnet: string;
        Gateway: string;
    }

    export interface IPAMOptions {
        Driver: Driver;
        Configs: Config[];
    }

    export interface DriverState {
        Name: string;
        Options: Options;
    }

    export interface NetworksAttachment {
        Network: Network;
        Addresses: string[];
    }

    export interface Task {
        ID: string;
        Version: Version;
        CreatedAt: string;
        UpdatedAt: any;
        Labels: Labels;
        Spec: Spec;
        ServiceID: string;
        Slot: number;
        NodeID: string;
        Status: Status;
        DesiredState: string;
        NetworksAttachments: NetworksAttachment[];
    }
}

