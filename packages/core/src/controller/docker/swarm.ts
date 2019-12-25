import { controller, httpGet, httpPost } from 'inversify-express-utils';
import * as docker from '@dayu/docker-api'

@controller('/swarm')
class SwarmController {
    @httpGet('/info')
    public async version() {
        return await docker.swarm.inspect();
    }
    @httpPost('/init')
    public async info() {
        let info = await docker.swarm.init({
            ListenAddr: "0.0.0.0:2377",
            AdvertiseAddr: "192.168.0.3:2377",
            // DefaultAddrPool: [
            //     "10.10.0.0/8",
            //     "20.20.0.0/8"
            // ],
            // ForceNewCluster: false,
            // SubnetSize: 24
        })
        return info;
    }
}