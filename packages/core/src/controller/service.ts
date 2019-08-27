import { controller, httpGet, requestParam } from 'inversify-express-utils';
import * as docker from '@dayu/docker-api'

@controller('/service')
class ServiceController {
    @httpGet('/list')
    public async list() {
        let services = await docker.service.list();
        return services.map(s => ({
            id: s.ID,
            name: s.Spec.Name
        }));
    }

    @httpGet('/:id')
    public async details(@requestParam('id') id: string) {
        return await docker.service.inspect(id)
    }
}
