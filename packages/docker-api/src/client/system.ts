import * as api from '../utils/api'
import * as types from '../api/types'

export namespace system {
    export async function info() {
        return await api.get<types.system.Info>('/info');
    }

    export async function version() {
        return await api.get<types.system.Version>('/version');
    }

    export async function events(cb: (events: object) => void) {
        let stream = await api.stream<any>('/events');
        stream.on('data', (chunk: ArrayBuffer) => {
            cb(JSON.parse(Buffer.from(chunk).toString()))
        })
        stream.on('end', () => {
            cb(undefined);
        })
    }
}
