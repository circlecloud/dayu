import api, { DockerApiClient } from './api'
import { Container } from './container'
import { Service } from './service'
import { Node } from './node'
import { Task } from './task'
import { Image } from './image'
import { Swarm } from './swarm'
import { Config } from './config'
import { Volume } from './volume'
import { System } from './system'
import { Network } from './network'
export class DockerClient {
    private containerInstance: Container;
    private serviceInstance: Service;
    private nodeInstance: Node;
    private taskInstance: Task;
    private imageInstance: Image;
    private swarmInstance: Swarm;
    private configInstance: Config;
    private volumeInstance: Volume;
    private systemInstance: System;
    private networkInstance: Network;
    constructor(apiClient: DockerApiClient = api) {
        this.containerInstance = new Container(apiClient)
        this.serviceInstance = new Service(apiClient)
        this.nodeInstance = new Node(apiClient)
        this.taskInstance = new Task(apiClient)
        this.imageInstance = new Image(apiClient)
        this.swarmInstance = new Swarm(apiClient)
        this.configInstance = new Config(apiClient)
        this.volumeInstance = new Volume(apiClient)
        this.systemInstance = new System(apiClient)
        this.networkInstance = new Network(apiClient)
    }
    get container() {
        return this.containerInstance;
    }
    get service() {
        return this.serviceInstance;
    }
    get node() {
        return this.nodeInstance;
    }
    get task() {
        return this.taskInstance;
    }
    get image() {
        return this.imageInstance;
    }
    get swarm() {
        return this.swarmInstance;
    }
    get config() {
        return this.configInstance;
    }
    get volume() {
        return this.volumeInstance;
    }
    get system() {
        return this.systemInstance;
    }
    get network() {
        return this.networkInstance;
    }
}

export default new DockerClient();