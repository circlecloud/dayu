import * as api from '../utils/api'
import * as opts from '../api/opts'
import * as types from '../api/types'
import * as filterUtil from '../api/opts/filter'

export namespace config {
    export async function list(filter?: opts.config.FilterOpt) {
        return await api.get<types.config.Config[]>('/configs', {
            filters: filterUtil.toJSON(filter)
        });
    }
    export async function inspect(id: string) {
        return await api.get(`/configs/${id}`)
    }
    export async function create() {
        return await api.post<{}>('/configs/create')
    }
}
