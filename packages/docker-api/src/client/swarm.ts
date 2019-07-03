import * as api from '../utils/api'
import * as opts from '../api/opts'
import * as types from '../api/types'

export namespace swarm {
    export async function inspect() {
        return await api.get<types.swarm.Info>('/swarm');
    }

    export async function init(opts: opts.swarm.InitOpts) {
        return await api.post<string>('/swarm/init', opts);
    }
}