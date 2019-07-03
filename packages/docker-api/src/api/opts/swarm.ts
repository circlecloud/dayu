import { Labels } from '../common'

export declare namespace swarm {
    type NodeAvailability = string;

    export interface InitOpts {
        ListenAddr?: string;
        AdvertiseAddr?: string;
        DefaultAddrPool?: string[];
        DataPathAddr?: string;
        DataPathPort?: number;
        SubnetSize?: number;
        ForceNewCluster?: boolean;
        Availability?: NodeAvailability;
        Spec?: Spec;
    }

    export interface Spec {
        Name?: string;
        Labels?: Labels;
        Orchestration?: Orchestration;
        Raft?: Raft;
        Dispatcher?: Dispatcher;
        CAConfig?: CAConfig;
        TaskDefaults?: TaskDefaults;
        EncryptionConfig?: EncryptionConfig;
    }

    export interface Version {
        Index: number;
    }

    export interface Orchestration {
        TaskHistoryRetentionLimit?: number;
    }

    export interface Raft {
        SnapshotInterval?: number;
        KeepOldSnapshots?: number;
        LogEntriesForSlowFollowers?: number;
        ElectionTick?: number;
        HeartbeatTick?: number;
    }

    export interface Dispatcher {
        HeartbeatPeriod?: number;
    }

    export interface CAConfig {
        NodeCertExpiry?: number;
    }

    export interface TaskDefaults {
    }

    export interface EncryptionConfig {
        AutoLockManagers?: boolean;
    }
}