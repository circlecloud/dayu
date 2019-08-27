import * as vscode from 'vscode';
import * as faas from '@dayu/faas';
import { BaseProvider, ItemContextValue } from './base';

enum Type {
    ROOT = "ROOT",
}

export class OpenFaasProvider extends BaseProvider<vscode.TreeItem> {
    onDidChangeTreeData?: vscode.Event<vscode.TreeItem>;

    constructor(context: vscode.ExtensionContext) {
        super();
        context.subscriptions.push(
            vscode.window.registerTreeDataProvider('openfaas-explorer', this)
        );
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Promise<vscode.TreeItem> {
        return element;
    }

    async getChildren(element?: vscode.TreeItem): Promise<vscode.TreeItem[]> {
        if (!element || !element.contextValue) {
            return [this.createTreeItem({
                label: "OpenFaaS",
                state: vscode.TreeItemCollapsibleState.Collapsed,
                context: {
                    type: Type.ROOT
                },
                icon: "logo"
            })];
        }
        let value: ItemContextValue = JSON.parse(element.contextValue);
        switch (value.type) {
            case Type.ROOT:
                let funcs = await faas.getFunctions();
                return funcs.map((f: any) => {
                    return this.createTreeItem({
                        label: f.name,
                        tooltip: JSON.stringify(f, undefined, 2)
                    });
                });
            default:
                return [];
        }
    }
}
