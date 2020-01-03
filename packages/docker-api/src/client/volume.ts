import * as types from '../api/types'
import { DockerApiClient } from './api';

export class Volume {
    constructor(public api: DockerApiClient) {
    }
    list() {
        return this.api.get<types.volume.VolumeJSON>('/volumes');
    }
}