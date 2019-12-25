import { controller, get, post, requestParam } from '@cc-server/binding';
import * as docker from '@dayu/docker-api'

const GROUP_LABEL = 'pw.yumc.group.name'

@controller('/group')
class GroupController {
    @get('/list')
    public async list(): Promise<any> {
        let stacks: { [key: string]: string[] } = {};
        let result = [];
        let services = await docker.service.list();
        for (const service of services) {
            let stackName = service.Spec.Labels[GROUP_LABEL]
            if (stackName) {
                let stack = stacks[stackName];
                if (!stack) {
                    result.push({
                        name: stackName,
                        services: stack = []
                    })
                    stacks[stackName] = stack;
                }
                stack.push(service.Spec.Name);
            }
        }
        return result;
    }

    @get('/:name')
    public async details(@requestParam('name') stack: string) {
        let filter: any = {}
        filter[`${GROUP_LABEL}=${stack}`] = true
        let filterOpt = {
            filters: JSON.stringify({
                "label": filter
            })
        }
        let services = await docker.service.list(filterOpt)
        let networks = await docker.network.list(filterOpt)
        return {
            services: services.map(service => service.Spec.Name),
            networks: networks.map(network => network.Name),
        }
    }
}