'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as test from './test/index';


class MyDefinitionProvider implements vscode.DefinitionProvider {
    public provideDefinition(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken):
        Thenable<vscode.Location> {
            console.log('trigger GoDefinitionProvider at ' + Date.now());
        return new Promise((resolve) => {

            // ... Do some stuff to find definitions 

            let file = path.join(__dirname, '../src/test/index.ts');
            console.log('resolve some thing ' + file);

            vscode.workspace.openTextDocument(file).then(doc => {
                // default range
                // {startLineNumber: 13, startColumn: 1, endLineNumber: 22, endColumn: 29}
                let range = doc.validateRange(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(99999, 99999)));
                
                //!!! Change startPosition.line to 12 will do the trick,
                // but there's no way to know other definitions exactly.
                // let range = doc.validateRange(new vscode.Range(new vscode.Position(12, 0), new vscode.Position(99999, 99999)));


                console.log(range);
                resolve(new vscode.Location(
                    vscode.Uri.file(file),
                    range
                ));
            });
        })
    }
}


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "test-def" is now active!');

    context.subscriptions.push(
        vscode.languages.registerDefinitionProvider(
            [{ pattern: '**' }], new MyDefinitionProvider()
        )
    );
}

// this method is called when your extension is deactivated
export function deactivate() {
}