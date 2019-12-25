import { controller, post, get, requestParam, queryParam } from '@cc-server/binding';
import * as docker from '@dayu/docker-api'

@controller('/task')
class TaskController {
    @get('/list')
    public async list(@queryParam('page') page: number, @queryParam('perPage') perPage: number, ) {
        let tasks = await docker.task.list();
        return {
            status: 0,
            msg: '',
            data: tasks.map(s => ({
                id: s.ID,
                image: s.Spec.ContainerSpec.Image.split('@')[0],
                status: s.Status,
                updated_at: s.UpdatedAt,
                raw: JSON.stringify(s),
            }))
        };
    }
}
