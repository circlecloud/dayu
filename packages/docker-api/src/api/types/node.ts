import { Labels } from '../common'

export declare namespace node {

    export interface Version {
        Index: number;
    }

    export interface Spec {
        Labels: Labels;
        Role: string;
        Availability: string;
    }

    export interface Platform {
        Architecture: string;
        OS: string;
    }

    export interface Resources {
        NanoCPUs: number;
        MemoryBytes: number;
    }

    export interface Plugin {
        Type: string;
        Name: string;
    }

    export interface Engine {
        EngineVersion: string;
        Plugins: Plugin[];
    }

    export interface TLSInfo {
        TrustRoot: string;
        CertIssuerSubject: string;
        CertIssuerPublicKey: string;
    }

    export interface Description {
        Hostname: string;
        Platform: Platform;
        Resources: Resources;
        Engine: Engine;
        TLSInfo: TLSInfo;
    }

    export interface Status {
        State: string;
        Addr: string;
    }

    export interface ManagerStatus {
        Leader: boolean;
        Reachability: string;
        Addr: string;
    }

    export interface Node {
        ID: string;
        Version: Version;
        CreatedAt: string;
        UpdatedAt: string;
        Spec: Spec;
        Description: Description;
        Status: Status;
        ManagerStatus: ManagerStatus;
    }
}

