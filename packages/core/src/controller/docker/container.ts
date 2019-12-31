import * as docker from '@dayu/docker-api'
import { io, interfaces, namespace, listener, Message } from '@cc-server/ws'
import { controller, get, post, requestParam } from '@cc-server/binding'

@controller('/container')
class ContainerController {
    @get('/list')
    public async list() {
        return await docker.container.list({
            filters: JSON.stringify({

            })
        });
    }
    @get('/:id')
    public async info(@requestParam('id') id: string) {
        return await docker.container;
    }
}

@controller('/exec')
class ContainerExecController {
    @post('/:id')
    public async create(@requestParam('id') id: string) {
        return await docker.container.exec.create(id, {

        })
    }
    @get('/:id')
    public async info(@requestParam('id') id: string) {
        return await docker.container;
    }
}

@namespace("/container")
class ContainerNamespace extends interfaces.Namespace {
    @listener()
    async logs(socket: io.Socket, data: any) {
        try {
            let stream = await docker.container.logs(data.id, data);
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
