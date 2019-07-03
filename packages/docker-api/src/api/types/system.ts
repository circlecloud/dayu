import { Labels, Options } from '../common'

export declare namespace system {
    export class Plugins {
        Volume: string[];
        Network: string[];
        Authorization?: any;
        Log: string[];
    }

    export class DockerIo {
        Name: string;
        Mirrors: string[];
        Secure: boolean;
        Official: boolean;
    }

    export class IndexConfigs {
        [key: string]: DockerIo;
    }

    export class RegistryConfig {
        AllowNondistributableArtifactsCIDRs: any[];
        AllowNondistributableArtifactsHostnames: any[];
        InsecureRegistryCIDRs: string[];
        IndexConfigs: IndexConfigs;
        Mirrors: string[];
    }

    export class Runc {
        path: string;
    }

    export class Runtimes {
        runc: Runc;
    }

    export class RemoteManager {
        NodeID: string;
        Addr: string;
    }

    export class ClusterVersion {
        Index: number;
    }

    export class Orchestration {
        TaskHistoryRetentionLimit: number;
    }

    export class Raft {
        SnapshotInterval: number;
        KeepOldSnapshots: number;
        LogEntriesForSlowFollowers: number;
        ElectionTick: number;
        HeartbeatTick: number;
    }

    export class Dispatcher {
        HeartbeatPeriod: number;
    }

    export class CAConfig {
        NodeCertExpiry: number;
    }

    export class TaskDefaults {
    }

    export class EncryptionConfig {
        AutoLockManagers: boolean;
    }

    export class Spec {
        Name: string;
        Labels: Labels;
        Orchestration: Orchestration;
        Raft: Raft;
        Dispatcher: Dispatcher;
        CAConfig: CAConfig;
        TaskDefaults: TaskDefaults;
        EncryptionConfig: EncryptionConfig;
    }

    export class TLSInfo {
        TrustRoot: string;
        CertIssuerSubject: string;
        CertIssuerPublicKey: string;
    }

    export class Cluster {
        ID: string;
        Version: ClusterVersion;
        CreatedAt: string;
        UpdatedAt: string;
        Spec: Spec;
        TLSInfo: TLSInfo;
        RootRotationInProgress: boolean;
        DefaultAddrPool: string[];
        SubnetSize: number;
    }

    export class Swarm {
        NodeID: string;
        NodeAddr: string;
        LocalNodeState: string;
        ControlAvailable: boolean;
        Error: string;
        RemoteManagers: RemoteManager[];
        Nodes: number;
        Managers: number;
        Cluster: Cluster;
    }

    export class ContainerdCommit {
        ID: string;
        Expected: string;
    }

    export class RuncCommit {
        ID: string;
        Expected: string;
    }

    export class InitCommit {
        ID: string;
        Expected: string;
    }

    export class Info {
        ID: string;
        Containers: number;
        ContainersRunning: number;
        ContainersPaused: number;
        ContainersStopped: number;
        Images: number;
        Driver: string;
        DriverStatus: string[][];
        SystemStatus?: any;
        Plugins: Plugins;
        MemoryLimit: boolean;
        SwapLimit: boolean;
        KernelMemory: boolean;
        CpuCfsPeriod: boolean;
        CpuCfsQuota: boolean;
        CPUShares: boolean;
        CPUSet: boolean;
        IPv4Forwarding: boolean;
        BridgeNfIptables: boolean;
        BridgeNfIp6tables: boolean;
        Debug: boolean;
        NFd: number;
        OomKillDisable: boolean;
        NGoroutines: number;
        SystemTime: string;
        LoggingDriver: string;
        CgroupDriver: string;
        NEventsListener: number;
        KernelVersion: string;
        OperatingSystem: string;
        OSType: string;
        Architecture: string;
        IndexServerAddress: string;
        RegistryConfig: RegistryConfig;
        NCPU: number;
        MemTotal: number;
        GenericResources?: any;
        DockerRootDir: string;
        HttpProxy: string;
        HttpsProxy: string;
        NoProxy: string;
        Name: string;
        Labels: string[];
        ExperimentalBuild: boolean;
        ServerVersion: string;
        ClusterStore: string;
        ClusterAdvertise: string;
        Runtimes: Runtimes;
        DefaultRuntime: string;
        Swarm: Swarm;
        LiveRestoreEnabled: boolean;
        Isolation: string;
        InitBinary: string;
        ContainerdCommit: ContainerdCommit;
        RuncCommit: RuncCommit;
        InitCommit: InitCommit;
        SecurityOptions: string[];
        ProductLicense: string;
        Warnings?: any;
    }

    export class Platform {
        Name: string;
    }
    export class Details {
        ApiVersion: string;
        Arch: string;
        BuildTime: string;
        Experimental: string;
        GitCommit: string;
        GoVersion: string;
        KernelVersion: string;
        MinAPIVersion: string;
        Os: string;
    }
    export class Component {
        Name: string;
        Version: string;
        Details: Details;
    }
    export class Version {
        Platform: Platform;
        Components: Component[];
        Version: string;
        ApiVersion: string;
        MinAPIVersion: string;
        GitCommit: string;
        GoVersion: string;
        Os: string;
        Arch: string;
        KernelVersion: string;
        BuildTime: string;
    }
}