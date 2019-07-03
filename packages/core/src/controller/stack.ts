import { controller, httpGet, httpPost, requestParam } from 'inversify-express-utils';
import * as docker from '@dayu/docker-api'

const STACK_LABEL = 'com.docker.stack.namespace';

@controller('/stack')
class StackController {
    @httpGet('/list')
    public async list() {
        let stacks: { [key: string]: string[] } = {};
        let services = await docker.service.list();
        for (const service of services) {
            let stackName = service.Spec.Labels[STACK_LABEL]
            if (stackName) {
                let stack = stacks[stackName] || [];
                stack.push(service.Spec.Name);
                stacks[stackName] = stack;
            }
        }
        return stacks;
    }

    @httpGet('/:stack')
    public async details(@requestParam('stack') stack: string) {
        let filter: any = {}
        filter[`${STACK_LABEL}=${stack}`] = true
        let filterOpt = {
            filters: JSON.stringify({
                "label": filter
            })
        }
        let services = await docker.service.list(filterOpt)
        let networks = await docker.network.list(filterOpt)
        let containers = await docker.container.list(filterOpt);
        return {
            services: services.map(service => service.Spec.Name),
            networks: networks.map(network => network.Name),
            containers: containers.map(container => container.Names[0].substring(1))
        }
    }
}
