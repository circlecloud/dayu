import * as api from '../utils/api'
import * as types from '../api/types'

export namespace image {
    export async function list() {
        return await api.get<types.image.Image[]>('/images/json');
    }
}
