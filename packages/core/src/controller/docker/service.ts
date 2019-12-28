import * as docker from '@dayu/docker-api'
import { namespace, listener, interfaces, io, Message } from '@cc-server/ws'
import { controller, post, get, requestParam, queryParam } from '@cc-server/binding';

@controller('/service')
class ServiceController {
    @get('/list')
    public async list(@queryParam('page') page: number, @queryParam('perPage') perPage: number, ) {
        let services = await docker.service.list();
        let rows = services.map(s => ({
            "service-name": s.Spec.Name,
            image: s.Spec.TaskTemplate.ContainerSpec.Image.split('@')[0],
            updated_at: s.UpdatedAt,
            mode: s.Spec.Mode,
            update_status: s.UpdateStatus
        }))
        return {
            status: 0,
            data: { rows }
        };
    }

    @post('/:id/restart')
    public async restart(@requestParam("id") id: string) {
        let service = await docker.service.inspect(id);
        service.Spec.TaskTemplate.ForceUpdate++
        return {
            status: 0,
            msg: '重启指令已发送',
            data: docker.service.update(id, { version: service.Version.Index }, service.Spec)
        }
    }

    @post('/:id/rollback')
    public async rollback(@requestParam("id") id: string) {
        let service = await docker.service.inspect(id);
        if (!service.PreviousSpec) {
            return {
                status: 1,
                msg: '服务自启动后从未重启<br>无法回滚!'
            }
        }
        return {
            status: 0,
            msg: '回滚指令已发送',
            data: docker.service.update(id, { version: service.Version.Index, rollback: 'previous' }, service.Spec)
        }
    }

    @post('/delete')
    public async delete() {
        return {
            status: 0,
            msg: '删除成功!',
        }
    }


    @get('/:id')
    public async details(@requestParam('id') id: string) {
        let service = await docker.service.inspect(id);
        return {
            status: 0,
            data: {
                id: service.ID,
                name: service.Spec.Name,
                env: (service.Spec.TaskTemplate.ContainerSpec.Env ?? []).map(e => {
                    let args = e.split('=');
                    return { key: args[0], value: args[1] }
                }),
                networks: service.Spec.TaskTemplate.Networks ?? [],
                raw: JSON.stringify(service)
            }
        }
    }
}

@namespace("/service")
class ServiceNamespace extends interfaces.Namespace {
    @listener()
    async logs(socket: io.Socket, data: any) {
        try {
            let stream = await docker.service.logs(data.id, data);
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
