// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// process.env.DOCKER_HOST = 'https://dscli.miaowoo.cc';
process.env.DOCKER_HOST = 'http://172.16.200.12:8376';
import { DockerProvider } from './provider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log('init...');
    // tslint:disable-next-line: no-unused-expression
    new DockerProvider(context);
    // tslint:disable-next-line: no-unused-expression
    // new OpenFaasProvider(context);
}

// this method is called when your extension is deactivated
export function deactivate() { }
