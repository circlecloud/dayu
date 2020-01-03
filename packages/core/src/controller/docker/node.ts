import docker from '@dayu/docker-api'
import { controller, httpGet, httpPost } from 'inversify-express-utils';

@controller('/node')
class NodeController {
    @httpGet('/list')
    public async list() {
        let nodes = await docker.node.list();
        return {
            status: 0,
            data: nodes.map(n => ({
                id: n.ID,
                manager: n.ManagerStatus,
                hostname: n.Description.Hostname,
                version: n.Description.Engine.EngineVersion,
                status: n.Status,
                raw: JSON.stringify(n)
            }))
        }
    }
}
