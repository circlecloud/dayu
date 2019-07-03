import * as api from '../utils/api';
import * as opts from '../api/opts'
import * as types from '../api/types'
import * as http from 'http'

export namespace container {
    export async function list(filters?: opts.container.ListOpts) {
        return await api.get<types.container.Container[]>('/containers/json', filters)
    }

    export async function info(id: string, query: { size: boolean } = { size: false }) {
        return await api.get<types.container.ContainerJSON>(`/containers/${id}/json`, query);
    }

    export async function logs(id: string, opts: opts.container.LogsOpts = {}): Promise<http.ServerResponse> {
        return await api.stream(`/containers/${id}/logs`, Object.assign({
            follow: true,
            stdout: true,
            stderr: true,
            tail: 10
        }, opts));
    }
}
