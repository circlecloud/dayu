import * as api from '../utils/api'
import * as types from '../api/types'

export namespace system {
    export async function info() {
        return await api.get<types.system.Info>('/info');
    }

    export async function version() {
        return await api.get<types.system.Version>('/version');
    }

    export async function events() {
        return await api.stream('/events');
    }
}
