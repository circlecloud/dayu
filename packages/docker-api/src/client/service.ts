import * as opts from '../api/opts';
import * as types from '../api/types';
import * as filterUtil from '../api/opts/filter'
import * as http from 'http'
import { DockerApiClient } from './api';

export class Service {
    constructor(public api: DockerApiClient) {
    }
    async list(filter?: opts.service.FilterOpt) {
        return await this.api.get<types.service.Service[]>('/services', {
            filters: filterUtil.toJSON(filter)
        });
    }
    async create() {

    }
    async inspect(id: string, query: { insertDefaults: boolean } = { insertDefaults: false }) {
        return await this.api.get<types.service.Service>(`/services/${id}`, query);
    }
    async update(id: string, query: { version: number, registryAuthFrom?: string, rollback?: string }, data: any) {
        return await this.api.post<any>(this.api.getUri(`/services/${id}/update`, query), data)
    }
    async logs(id: string, opts: opts.service.LogsOpts = {}): Promise<http.ServerResponse> {
        let data = {
            follow: true,
            stdout: true,
            stderr: true,
            tail: 10,
            ...opts
        }
        return await this.api.stream(`/services/${id}/logs`, data);
    }
}
