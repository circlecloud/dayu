import * as opts from '../api/opts'
import * as types from '../api/types'
import * as http from 'http'
import { DockerApiClient } from './api';

export class Task {
    constructor(public api: DockerApiClient) {
    }
    list() {
        return this.api.get<types.task.Task[]>('/tasks');
    }
    logs(id: string, opts: opts.task.LogsOpts = {}): Promise<http.ServerResponse> {
        let data = {
            follow: true,
            stdout: true,
            stderr: true,
            tail: 10,
            ...opts
        }
        return this.api.stream(`/services/${id}/logs`, data);
    }
}