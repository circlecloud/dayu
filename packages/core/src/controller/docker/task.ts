import docker from '@dayu/docker-api'
import { namespace, listener, interfaces, io, Message } from '@cc-server/ws'
import { controller, post, get, requestParam, queryParam } from '@cc-server/binding';

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

@namespace("/task")
class TaskNamespace extends interfaces.Namespace {
    @listener()
    async logs(socket: io.Socket, data: any) {
        try {
            let stream = await docker.task.logs(data.id, data);
            this.defer(socket, () => stream.connection.destroy());
            stream.on('data', (chunk: ArrayBuffer) => {
                let log = Buffer.from(chunk.slice(8, chunk.byteLength - 1)).toString();
                socket.send(log);
            })
        } catch (ex) {
            return new Message(ex.message);
        }
    }
}