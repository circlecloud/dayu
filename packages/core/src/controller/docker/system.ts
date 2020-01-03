import docker from '@dayu/docker-api'
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { io, namespace, listener, interfaces, Message } from '@cc-server/ws';

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
        let stream = await docker.system.events();
        stream.on('data', (chunk: ArrayBuffer) => {
            let log = Buffer.from(chunk).toString();
            console.log(log);
        })
        return {}
    }
}

@namespace()
class SystemNamespace extends interfaces.Namespace {
    @listener()
    async events(socket: io.Socket) {
        try {
            socket.send('Starting listening docker event...');
            let stream = await docker.system.events();
            socket.send('Connect to docker deamon...');
            this.defer(socket, () => stream.connection.destroy());
            stream.on('data', (chunk: ArrayBuffer) => {
                let log = Buffer.from(chunk).toString();
                console.log(log);
                socket.send(log);
            })
        } catch (ex) {
            //console.error(ex);
            return new Message(ex.message);
        }
    }
}