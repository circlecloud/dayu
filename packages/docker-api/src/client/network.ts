import * as api from '../utils/api'
import * as opts from '../api/opts'
import * as types from '../api/types'

export namespace network {
    export async function list(opts?: opts.network.ListOpts) {
        return await api.get<types.network.NetworkResource[]>('/networks', opts)
    }
}
