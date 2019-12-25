import { Labels, Options } from '../common'

export declare namespace service {
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

    export interface DNSConfig {
    }

    export interface ContainerSpec {
        Image: string;
        Labels: Labels;
        Privileges: Privileges;
        Mounts: Mount[];
        Isolation: string;
        Env: string[];
        Secrets: Secret[];
        Args: string[];
        StopGracePeriod?: number;
        DNSConfig: DNSConfig;
        User: string;
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
        Delay: any;
        MaxAttempts: number;
        Window: any;
    }

    export interface LogDriver {
        Name: string;
        Options: Options;
    }

    export interface TaskTemplate {
        ContainerSpec: ContainerSpec;
        Resources: Resources;
        Placement: Placement;
        Networks: Network[];
        ForceUpdate: number;
        Runtime: string;
        RestartPolicy: RestartPolicy;
        LogDriver: LogDriver;
    }

    export interface Replicated {
        Replicas: number;
    }

    export interface Global {
    }

    export interface Mode {
        Replicated: Replicated;
        Global: Global;
    }

    export interface Port {
        Protocol: string;
        TargetPort: number;
        PublishedPort: number;
        PublishMode: string;
    }

    export interface EndpointSpec {
        Mode: string;
        Ports: Port[];
    }

    export interface UpdateConfig {
        Parallelism: number;
        FailureAction: string;
        Monitor: number;
        MaxFailureRatio: number;
        Order: string;
    }

    export interface RollbackConfig {
        Parallelism: number;
        FailureAction: string;
        Monitor: number;
        MaxFailureRatio: number;
        Order: string;
    }

    export interface Spec {
        Name: string;
        Labels: Labels;
        TaskTemplate: TaskTemplate;
        Mode: Mode;
        EndpointSpec: EndpointSpec;
        UpdateConfig: UpdateConfig;
        RollbackConfig: RollbackConfig;
    }

    export interface VirtualIP {
        NetworkID: string;
        Addr: string;
    }

    export interface Endpoint {
        Spec: Spec;
        Ports: Port[];
        VirtualIPs: VirtualIP[];
    }

    export interface PreviousSpec {
        Name: string;
        Labels: Labels;
        TaskTemplate: TaskTemplate;
        Mode: Mode;
        EndpointSpec: EndpointSpec;
        UpdateConfig: UpdateConfig;
        RollbackConfig: RollbackConfig;
    }

    export interface UpdateStatus {
        State: string;
        StartedAt: string;
        CompletedAt: string;
        Message: string;
    }

    export interface Service {
        ID: string;
        Version: Version;
        CreatedAt: string;
        UpdatedAt: any;
        Spec: Spec;
        Endpoint: Endpoint;
        PreviousSpec: PreviousSpec;
        UpdateStatus: UpdateStatus;
    }
}

