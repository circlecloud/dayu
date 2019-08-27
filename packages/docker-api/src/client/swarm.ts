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

    export async function join(opts: opts.swarm.JoinOpts) {
        return await api.post<string>('/swarm/join', opts);
    }

    export async function leave(force: boolean = false) {
        return await api.post<string>(`/swarm/leave?force=${force}`);
    }

    export async function unlockkey() {
        return await api.get<string>(`/swarm/unlockkey`);
    }

    export async function unlock(opts: opts.swarm.UnlockOpts) {
        return await api.post<string>(`/swarm/unlockkey`, opts);
    }
}