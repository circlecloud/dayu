import { CcServerBoot } from '@cc-server/core'
import * as fs from 'fs'
import * as path from 'path'

//process.env.DOCKER_HOST = 'https://ndcli.yumc.pw'
process.env.DOCKER_HOST = '/var/run/docker.sock'

let server = new CcServerBoot();

let modulesDir = path.join(__dirname, 'controller')
let list = fs.readdirSync(modulesDir);

for (let file of list) {
    let moduleDir = path.join(modulesDir, file)
    let stat = fs.statSync(moduleDir);
    if (stat.isFile() && file.endsWith('.js')) {
        require(moduleDir);
    }
}

server.static().build().start();
