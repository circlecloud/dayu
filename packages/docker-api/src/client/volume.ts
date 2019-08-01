import * as api from '../utils/api'
import * as types from '../api/types'

export namespace volume {
    export async function list() {
        return await api.get<types.volume.VolumeJSON>('/volumes');
    }
}