import * as opts from '../api/opts'
import * as types from '../api/types'
import * as filterUtil from '../api/opts/filter'
import { DockerApiClient } from './api';

export class Config {
    constructor(public api: DockerApiClient) {
    }
    list(filter?: opts.config.FilterOpt) {
        return this.api.get<types.config.Config[]>('/configs', {
            filters: filterUtil.toJSON(filter)
        });
    }
    inspect(id: string) {
        return this.api.get(`/configs/${id}`)
    }
    create() {
        return this.api.post<{}>('/configs/create')
    }
}
