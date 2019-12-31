import { Labels, Config as CommonConfig, Ports, Options, StringMap, ObjectMap } from '../common'

export declare namespace container {
    export interface ContainerState {
        Status: string;
        Running: boolean;
        Paused: boolean;
        Restarting: boolean;
        OOMKilled: boolean;
        Dead: boolean;
        Pid: number;
        ExitCode: number;
        Error: string;
        StartedAt: string;
        FinishedAt: Date;
    }

    export interface LogConfig {
        Type: string;
        Config: CommonConfig;
    }

    export interface PortBindings {
    }

    export interface RestartPolicy {
        Name: string;
        MaximumRetryCount: number;
    }

    // WeightDevice is a structure that holds device:weight pair
    export interface WeightDevice {
        Path: string;
        Weight: number;
    }
    // ThrottleDevice is a structure that holds device:rate_per_second pair
    export interface ThrottleDevice {
        Path: string;
        Rate: number;
    }
    // DeviceMapping represents the device mapping between the host and the container.
    export interface DeviceMapping {
        PathOnHost: string;
        PathInContainer: string;
        CgroupPermissions: string;
    }
    // DeviceRequest represents a request for devices from a device driver.
    // Used by GPU device drivers.
    export interface DeviceRequest {
        Driver: string              // Name of device driver
        Count: number               // Number of devices to request (-1 = All)
        DeviceIDs: string[]         // List of device IDs as recognizable by the device driver
        Capabilities: string[][]    // An OR list of AND lists of device capabilities (e.g. "gpu")
        Options: StringMap          // Options to pass onto the device driver
    }
    export interface Resources {
        CpuShares?: number;
        Memory?: number;
        NanoCpus?: number;
        CgroupParent?: string;
        BlkioWeight?: number;
        BlkioWeightDevice?: WeightDevice[];
        BlkioDeviceReadBps?: ThrottleDevice[];
        BlkioDeviceWriteBps?: ThrottleDevice[];
        BlkioDeviceReadIOps?: ThrottleDevice[];
        BlkioDeviceWriteIOps?: ThrottleDevice[];
        CpuPeriod?: number;
        CpuQuota?: number;
        CpuRealtimePeriod?: number;
        CpuRealtimeRuntime?: number;
        CpusetCpus?: string;
        CpusetMems?: string;
        Devices?: DeviceMapping[];
        DeviceCgroupRules?: string[];
        DeviceRequests: DeviceRequest[];
        DiskQuota?: number;
        KernelMemory?: number;
        MemoryReservation?: number;
        MemorySwap?: number;
        MemorySwappiness?: any;
        OomKillDisable?: boolean;
        PidsLimit?: number;
        Ulimits?: any;
        CpuCount?: number;
        CpuPercent?: number;
        IOMaximumIOps?: number;
        IOMaximumBandwidth?: number;
    }

    export interface HostConfig extends Resources {
        Binds?: any;
        ContainerIDFile: string;
        LogConfig: LogConfig;
        NetworkMode: string;
        PortBindings: PortBindings;
        RestartPolicy: RestartPolicy;
        AutoRemove: boolean;
        VolumeDriver: string;
        VolumesFrom?: any;
        CapAdd?: any;
        CapDrop?: any;
        Dns?: any;
        DnsOptions?: any;
        DnsSearch?: any;
        ExtraHosts?: any;
        GroupAdd?: any;
        IpcMode: string;
        Cgroup: string;
        Links?: any;
        OomScoreAdj: number;
        PidMode: string;
        Privileged: boolean;
        PublishAllPorts: boolean;
        ReadonlyRootfs: boolean;
        SecurityOpt?: any;
        UTSMode: string;
        UsernsMode: string;
        ShmSize: number;
        Runtime: string;
        ConsoleSize: number[];
        Isolation: string;
        Mounts: Mount[];
        MaskedPaths: string[];
        ReadonlyPaths: string[];
    }

    export interface Data {
        LowerDir: string;
        MergedDir: string;
        UpperDir: string;
        WorkDir: string;
    }

    export interface GraphDriver {
        Data: Data;
        Name: string;
    }

    export type ExposedPorts = Ports

    // HealthConfig holds configuration settings for the HEALTHCHECK feature.
    export interface HealthConfig {
        // Test is the test to perform to check that the container is healthy.
        // An empty slice means to inherit the default.
        // The options are:
        // {} : inherit healthcheck
        // {"NONE"} : disable healthcheck
        // {"CMD", args...} : exec arguments directly
        // {"CMD-SHELL", command} : run command with system's default shell
        Test: string[];

        // Zero means to inherit. Durations are expressed as integer nanoseconds.
        Interval: number; // Interval is the time to wait between checks.
        Timeout: number; // Timeout is the time to wait before considering the check to have hung.
        StartPeriod: number; // The start period for the container to initialize before the retries starts to count down.

        // Retries is the number of consecutive failures needed to consider a container as unhealthy.
        // Zero means inherit.
        Retries: number;
    }

    export interface Config {
        Hostname: string;
        Domainname: string;
        User: string;
        AttachStdin: boolean;
        AttachStdout: boolean;
        AttachStderr: boolean;
        ExposedPorts: ExposedPorts;
        Tty: boolean;
        OpenStdin: boolean;
        StdinOnce: boolean;
        Env: string[];
        Cmd?: any;
        Healthcheck?: HealthConfig;
        ArgsEscaped: boolean;
        Image: string;
        Volumes?: ObjectMap;
        WorkingDir: string;
        Entrypoint: string[];
        NetworkDisabled: boolean;
        MacAddress: string;
        OnBuild?: any;
        Labels: Labels;
        StopSignal: string;
        StopTimeout: number;
        Shell: string[];
    }

    export interface IPAMConfig {
        IPv4Address: string;
    }

    export interface Networks {
        [key: string]: Network
    }

    export interface NetworkSettings {
        Bridge: string;
        SandboxID: string;
        HairpinMode: boolean;
        LinkLocalIPv6Address: string;
        LinkLocalIPv6PrefixLen: number;
        Ports: Ports;
        SandboxKey: string;
        SecondaryIPAddresses?: any;
        SecondaryIPv6Addresses?: any;
        EndpointID: string;
        Gateway: string;
        GlobalIPv6Address: string;
        GlobalIPv6PrefixLen: number;
        IPAddress: string;
        IPPrefixLen: number;
        IPv6Gateway: string;
        MacAddress: string;
        Networks: Networks;
    }

    export interface ContainerJSON {
        Id: string;
        Created: string;
        Path: string;
        Args: string[];
        State: ContainerState;
        Image: string;
        ResolvConfPath: string;
        HostnamePath: string;
        HostsPath: string;
        LogPath: string;
        Name: string;
        RestartCount: number;
        Driver: string;
        Platform: string;
        MountLabel: string;
        ProcessLabel: string;
        AppArmorProfile: string;
        ExecIDs?: any;
        HostConfig: HostConfig;
        GraphDriver: GraphDriver;
        Mounts: Mount[];
        Config: Config;
        NetworkSettings: NetworkSettings;
    }

    export interface Port {
        IP: string;
        PrivatePort: number;
        PublicPort: number;
        Type: string;
    }

    export interface Network {
        IPAMConfig?: IPAMConfig;
        Links?: any;
        Aliases?: any;
        NetworkID: string;
        EndpointID: string;
        Gateway: string;
        IPAddress: string;
        IPPrefixLen: number;
        IPv6Gateway: string;
        GlobalIPv6Address: string;
        GlobalIPv6PrefixLen: number;
        MacAddress: string;
        DriverOpts?: any;
    }

    export interface SummaryNetworkSettings {
        Networks: Networks;
    }

    export interface Mount {
        Type: string;
        Name: string;
        Source: string;
        Destination: string;
        Driver: string;
        Mode: string;
        RW: boolean;
        Propagation: string;
    }

    export interface Container {
        Id: string;
        Names: string[];
        Image: string;
        ImageID: string;
        Command: string;
        Created: number;
        Ports: Port[];
        Labels: Labels;
        State: string;
        Status: string;
        HostConfig: {
            NetworkMode: string;
        };
        NetworkSettings: SummaryNetworkSettings;
        Mounts: Mount[];
    }

    export interface ContainerPrune {
        ContainersDeleted: string[];
        SpaceReclaimed: number;
    }

    export namespace exec {
        export interface CreateResult {
            Id: string;
        }
        export interface StartResult {

        }
        export interface ResizeResult {

        }
        export interface ProcessConfig {
            arguments: string[];
            entrypoint: string;
            privileged: boolean;
            tty: boolean;
            user: string;
        }
        export interface ExecJson {
            CanRemove: boolean;
            ContainerID: string;
            DetachKeys: string;
            ExitCode: number;
            ID: string;
            OpenStderr: boolean;
            OpenStdin: boolean;
            OpenStdout: boolean;
            ProcessConfig: ProcessConfig;
            Running: boolean;
            Pid: number;
        }
    }
}
