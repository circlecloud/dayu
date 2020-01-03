import  docker from '@dayu/docker-api'
import { controller, httpGet } from "@cc-server/binding";

const STACK_LABEL = 'com.docker.stack.namespace';

@controller('/dashboard')
class DashboardController {
    @httpGet('')
    async index() {
        let stacks = [];
        let services = [];
        let svrs = await docker.service.list();
        for (const service of svrs) {
            if (service.Spec.Labels[STACK_LABEL]) {
                stacks.push(service.Spec.Labels[STACK_LABEL]);
            }
            services.push(service.Spec.Name)
        }
        let networks = await docker.network.list();
        let nodes = await docker.node.list();
        let tasks = await docker.task.list();
        let containers = await docker.container.list();
        let images = await docker.image.list();
        let volumes = await docker.volume.list();
        return {
            nodes: nodes.map(n => n.Description.Hostname),
            tasks: tasks.map(t => t.ID),
            stacks: Array.from(new Set(stacks)),
            services,
            networks: networks.map(n => n.Name),
            containers: containers.map(c => c.Names[0].substr(1)),
            images: images.map(i => i.Id),
            volumes: volumes.Volumes.map(v => v.Name)
        }
    }
}
