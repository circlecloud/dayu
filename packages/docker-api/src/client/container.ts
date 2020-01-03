import * as opts from '../api/opts'
import * as types from '../api/types'
import * as http from 'http'
import { DockerApiClient } from './api';

export class Container {
    private execClient: Exec;
    constructor(public api: DockerApiClient) {
        this.execClient = new Exec(api);
    }

    get exec() {
        return this.execClient;
    }

    async  list(filters?: opts.container.ListOpts) {
        return await this.api.get<types.container.Container[]>('/containers/json', filters)
    }

    async  inspect(id: string, query: { size: boolean } = { size: false }) {
        return await this.api.get<types.container.ContainerJSON>(`/containers/${id}/json`, query);
    }

    prune() {
        return this.api.post<types.container.ContainerPrune>('/containers/prune');
    }

    async  logs(id: string, opts: opts.container.LogsOpts = {}): Promise<http.ServerResponse> {
        let data = {
            follow: true,
            stdout: true,
            stderr: true,
            tail: 10,
            ...opts
        }
        return await this.api.stream(`/containers/${id}/logs`, data);
    }
}

class Exec {
    constructor(public api: DockerApiClient) { }
    create(id: string, opts: opts.container.exec.Create = {}): Promise<types.container.exec.CreateResult> {
        let request = {
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            DetachKeys: 'ctrl-d',
            Tty: true,
            Cmd: '/bin/sh',
            ...opts
        }
        request.AttachStderr = true
        return this.api.post<types.container.exec.CreateResult>(`/containers/${id}/exec`, request)
    }
    start(id: string, opts: opts.container.exec.Start = {}) {
        return this.api.post<types.container.exec.StartResult>(`/exec/${id}/start`, opts)
    }
    resize(id: string, opts: opts.container.exec.Resize = {}) {
        return this.api.post<types.container.exec.ResizeResult>(`/exec/${id}/resize`, opts)
    }
    inspect(id: string) {
        return this.api.get<types.container.exec.ExecJson>(`/exec/${id}/json`)
    }
}