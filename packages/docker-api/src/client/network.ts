import * as opts from '../api/opts'
import * as types from '../api/types'
import { DockerApiClient } from './api'

export class Network {
    constructor(public api: DockerApiClient) {
    }
    list(opts?: opts.network.ListOpts) {
        return this.api.get<types.network.NetworkResource[]>('/networks', opts)
    }
}
