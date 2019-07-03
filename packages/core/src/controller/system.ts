import { controller, httpGet, httpPost } from 'inversify-express-utils';
import * as docker from '@dayu/docker-api'

@controller('')
class SystemController {
    @httpGet('/version')
    public async version() {
        return await docker.system.version()
    }
    @httpGet('/info')
    public async info() {
        let info = await docker.system.info()
        return info;
    }
    @httpGet('/events')
    public async event() {
        await docker.system.events((event) => {
            if (!event) { return }
            console.log(event)
        })
    }
}