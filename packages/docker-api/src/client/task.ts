import * as api from '../utils/api'
import * as types from '../api/types'

export namespace task {
    export async function list() {
        return await api.get<types.task.Task[]>('/tasks');
    }
}