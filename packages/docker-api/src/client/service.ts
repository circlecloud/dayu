import * as api from '../utils/api';
import * as opts from '../api/opts';
import * as types from '../api/types';

export namespace service {
    export async function list(filters?: opts.service.ListOpts) {
        return await api.get<types.service.Service[]>('/services', filters);
    }
    export async function create() {

    }
    export async function inspect(id: string, query: { insertDefaults: boolean } = { insertDefaults: false }) {
        return await api.get<types.service.Service>(`/services/${id}`, query);
    }
    export async function update(id: string, query: { version: number, registryAuthFrom?: string, rollback?: string }, data: any) {
        return await api.post<any>(api.getUri(`/services/${id}/update`, query), data)
    }
}
