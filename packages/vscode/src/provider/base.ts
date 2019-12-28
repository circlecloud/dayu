import * as vscode from 'vscode'

export class CreateItemOpt {
    label: string;
    context?: ItemContextValue;
    state?: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None;
    icon?: string;
    tooltip?: string;
}

export interface ItemContextValue {
    type?: string;
    data?: any;
}

export abstract class BaseProvider<T> implements vscode.TreeDataProvider<T> {
    abstract onDidChangeTreeData?: vscode.Event<T | null | undefined> | undefined;
    abstract getTreeItem(element: T): vscode.TreeItem | Thenable<vscode.TreeItem>;
    abstract getChildren(element?: T | undefined): vscode.ProviderResult<T[]>;

    createTreeItem(opts: CreateItemOpt) {
        let item = new vscode.TreeItem(opts.label, opts.state);
        item.contextValue = JSON.stringify(opts.context);
        if (opts.icon) { item.iconPath = `src/images/${opts.icon}.svg` }
        if (opts.tooltip) { item.tooltip = opts.tooltip; }
        return item;
    }
}
