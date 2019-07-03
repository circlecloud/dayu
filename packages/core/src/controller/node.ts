import { controller, httpGet, httpPost } from 'inversify-express-utils';
import * as docker from '@dayu/docker-api'

@controller('/node')
class NodeController {
    @httpGet('/list')
    public async list() {
        return await docker.node.list();
    }
}
