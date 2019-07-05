import * as vscode from 'vscode'
import { BaseProvider, ItemContextValue } from './base'
import * as docker from '@dayu/docker-api'

enum Type {
    ROOT = "ROOT",
    HOST = "HOST",
    CONTAINERS = "CONTAINERS",
    CONTAINER = "CONTAINER",
    SERVICES = "SERVICES",
    SERVICE = "SERVICE",
    NETWORKS = "NETWORKS",
    NETWORK = "NETWORK",
    STACKS = "STACKS",
    STACK = "STACK",
    NODES = "NODES",
    NODE = "NODE"
}

let TREE_LIST = [Type.NODES, Type.CONTAINERS, Type.SERVICES, Type.STACKS, Type.NETWORKS]
const STACK_LABEL = 'com.docker.stack.namespace';

export class DockerProvider extends BaseProvider<vscode.TreeItem> {
    onDidChangeTreeData?: vscode.Event<vscode.TreeItem | null | undefined> | undefined;

    constructor(context: vscode.ExtensionContext) {
        super();
        context.subscriptions.push(
            vscode.commands.registerCommand('dayu.container.logs', (item: vscode.TreeItem) => {
                let value: ItemContextValue = JSON.parse(item.contextValue);
                let url = `https://faas.n.yumc.pw?action=container&data=${value.data.id}`;
                return vscode.commands.executeCommand("mini-browser.openUrl", url);
            }),
            vscode.window.registerTreeDataProvider('docker-explorer', this)
        )
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    async getChildren(element?: vscode.TreeItem | undefined): Promise<vscode.TreeItem[]> {
        if (!element || !element.contextValue) {
            return [this.createTreeItem({
                label: 'Docker',
                context: {
                    type: Type.ROOT
                },
                state: vscode.TreeItemCollapsibleState.Collapsed,
                icon: "docker"
            })]
        }
        let value: ItemContextValue = JSON.parse(element.contextValue);
        switch (value.type) {
            case Type.ROOT:
                return TREE_LIST.map(i => {
                    return this.createTreeItem({
                        label: i,
                        context: {
                            type: i
                        },
                        state: vscode.TreeItemCollapsibleState.Collapsed
                    })
                })
            case Type.NODES:
                let nodes = await docker.node.list();
                return nodes.map(n => {
                    return this.createTreeItem({
                        label: n.ID,
                        context: {
                            type: Type.NODE,
                            data: {
                                id: n.ID
                            }
                        },
                        tooltip: JSON.stringify(n, undefined, 2)
                    })
                })
            case Type.CONTAINERS:
                let containers = await docker.container.list();
                return containers.map(c => {
                    return this.createTreeItem({
                        label: c.Names[0],
                        context: {
                            type: Type.CONTAINER,
                            data: {
                                id: c.Id
                            }
                        },
                        tooltip: JSON.stringify(c, undefined, 2)
                    })
                })
            case Type.SERVICES:
                let services = await docker.service.list();
                return services.map(s => {
                    return this.createTreeItem({
                        label: s.Spec.Name,
                        context: {
                            type: Type.SERVICE,
                            data: {
                                id: s.ID
                            }
                        },
                        tooltip: JSON.stringify(s, undefined, 2)
                    })
                })
            case Type.NETWORKS:
                let networks = await docker.network.list();
                return networks.map(n => {
                    return this.createTreeItem({
                        label: n.Name,
                        context: {
                            type: Type.NETWORK,
                            data: {
                                id: n.Id
                            }
                        },
                        tooltip: JSON.stringify(n, undefined, 2)
                    })
                })
            case Type.STACKS:
                let stacks: { [key: string]: string[] } = {};
                let svrs = await docker.service.list();
                for (const service of svrs) {
                    let stackName = service.Spec.Labels[STACK_LABEL]
                    if (stackName) {
                        let stack = stacks[stackName] || [];
                        stack.push(service.Spec.Name);
                        stacks[stackName] = stack;
                    }
                }
                return Object.keys(stacks).map(stack => {
                    return this.createTreeItem({
                        label: stack,
                        context: {
                            type: Type.STACK,
                            data: {
                                name: stack,
                                list: stacks[stack]
                            }
                        },
                        state: vscode.TreeItemCollapsibleState.Collapsed
                    })
                })
            case Type.STACK:
                let list: string[] = value.data.list;
                return list.map(s => {
                    return this.createTreeItem({
                        label: s
                    })
                })
            default:
        }
        return [];
    }
}