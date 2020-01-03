import * as opts from '../api/opts'
import * as types from '../api/types'
import { DockerApiClient } from './api';

export class Swarm {
    constructor(public client: DockerApiClient) {
    }
    inspect() {
        return this.client.get<types.swarm.Info>('/swarm');
    }
    init(opts: opts.swarm.InitOpts) {
        return this.client.post<string>('/swarm/init', opts);
    }
    join(opts: opts.swarm.JoinOpts) {
        return this.client.post<string>('/swarm/join', opts);
    }
    leave(force: boolean = false) {
        return this.client.post<string>(`/swarm/leave?force=${force}`);
    }
    unlockkey() {
        return this.client.get<string>(`/swarm/unlockkey`);
    }
    unlock(opts: opts.swarm.UnlockOpts) {
        return this.client.post<string>(`/swarm/unlockkey`, opts);
    }
}