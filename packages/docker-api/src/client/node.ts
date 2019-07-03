import * as api from '../utils/api'
import * as types from '../api/types'

export namespace node {
    export async function list() {
        return await api.get<types.node.Node[]>('/nodes');
    }
}
