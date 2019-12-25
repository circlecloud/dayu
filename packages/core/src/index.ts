import { CcServerBoot } from '@cc-server/core'
import { getContainer } from '@cc-server/ioc'
import { DBClient } from '@cc-server/db'
import { MongoCollection } from '@cc-server/db-mongo';
import { MongoClient, Db, Logger } from 'mongodb'
import * as fs from 'fs'
import * as path from 'path'

//process.env.DOCKER_HOST = 'https://ndcli.yumc.pw'
// process.env.DOCKER_HOST = '/var/run/docker.sock'
// process.env.DOCKER_HOST = 'https://dscli.miaowoo.cc'
// process.env.DOCKER_HOST = 'http://172.20.0.90:2378'
// process.env.DOCKER_HOST = 'https://dcli.yumc.pw'
process.env.DOCKER_HOST = 'http://172.16.200.12:8376'
let CC_MONGO_URL = process.env.CC_MONGO_URL
let CC_MONGO_DB = process.env.CC_MONGO_DB
// if (process.env.local) {
console.log("RUN AT LOCAL DOCKER!!!!!")
CC_MONGO_URL = "mongodb://192.168.2.5:27017"
CC_MONGO_DB = "dayu"
// }

const container = getContainer()
const server = new CcServerBoot(container);

function injectDBClient(db: Db, table: string) {
    server.container.bind(DBClient).toConstantValue(new MongoCollection(db.collection(table))).whenTargetNamed(table)
}
function requireDir(modulesDir: string) {
    let list = fs.readdirSync(modulesDir);
    for (let file of list) {
        let moduleDir = path.join(modulesDir, file)
        let stat = fs.statSync(moduleDir);
        if (stat.isDirectory()) {
            requireDir(moduleDir)
        } else if (stat.isFile() && file.endsWith('.js')) {
            require(moduleDir);
        }
    }
}

requireDir(path.join(__dirname, 'controller'))

MongoClient.connect(CC_MONGO_URL, { useNewUrlParser: true, connectTimeoutMS: 1000 }, (error, client) => {
    if (error) {
        console.log(error)
    } else {
        let db = client.db(CC_MONGO_DB);
        // Logger.setLevel('debug');
        injectDBClient(db, "page");
        server.start(81)
    }
})
