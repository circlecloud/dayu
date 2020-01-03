import * as types from '../api/types'
import { DockerApiClient } from './api';

export class Image {
    constructor(public api: DockerApiClient) {
    }
    list() {
        return this.api.get<types.image.Image[]>('/images/json');
    }
}
