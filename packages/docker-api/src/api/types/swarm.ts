import { Version, Labels, Meta } from '../common'

export declare namespace swarm {
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

    export interface TLSInfo {
        TrustRoot: string;
        CertIssuerSubject: string;
        CertIssuerPublicKey: string;
    }

    export interface JoinTokens {
        Worker: string;
        Manager: string;
    }

    export interface Info extends Meta {
        ID: string;
        Spec: Spec;
        TLSInfo: TLSInfo;
        RootRotationInProgress: boolean;
        DefaultAddrPool: string[];
        SubnetSize: number;
        JoinTokens: JoinTokens;
    }
}