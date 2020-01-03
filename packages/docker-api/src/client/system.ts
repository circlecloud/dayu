import * as types from '../api/types'
import { DockerApiClient } from './api';

export class System {
    constructor(public api: DockerApiClient) {
    }
    info() {
        return this.api.get<types.system.Info>('/info');
    }

    version() {
        return this.api.get<types.system.Version>('/version');
    }

    events() {
        return this.api.stream('/events');
    }
}
