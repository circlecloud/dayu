import docker from '@dayu/docker-api'
import { controller, get, requestParam } from '@cc-server/binding'

@controller('/config')
class ConfigController {
    @get('/list')
    public async list() {
        return await docker.config.list({ label: "com.docker.stack.namespace=nacos-cloud" });
    }
    @get('/:id')
    public async info(@requestParam('id') id: string) {
        return await docker.config.inspect(id);
    }
}