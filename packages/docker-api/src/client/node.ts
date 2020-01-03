import * as types from '../api/types'
import { DockerApiClient } from './api';

export class Node {
    constructor(public api: DockerApiClient) {
    }
    list() {
        return this.api.get<types.node.Node[]>('/nodes');
    }
}
