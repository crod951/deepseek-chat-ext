// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import ollama from 'ollama';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
  console.log('deepseek-chat-ext is activated');
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('deepseek-chat-ext.startChat', () => {
		// The code you place here will be executed every time your command is executed
		const panel = vscode.window.createWebviewPanel(
			'deepseek-chat-ext',
			'DeepSeek Chat Ext',
			vscode.ViewColumn.One,
			{
				enableScripts: true,
			}
		);

    panel.webview.html = getWebviewContent();

    panel.webview.onDidReceiveMessage(async (message: any) => {
      if (message.command === 'chat') {
        let responseText = '';
        try {
          const response = await ollama.chat({
            model: 'deepseek-r1:7b',
            messages: [{ role: 'user', content: message.text }],
            stream: true,
          });

          for await (const chunk of response) {
            responseText += chunk.message.content;
            panel.webview.postMessage({
              command: 'chatResponse',
              text: responseText,
            });
          }
        } catch (error) {
          panel.webview.postMessage({
            command: 'chatResponse',
            text: `Error generating response. Please try again.\n \`Error: ${String(error)}\``,
          });
        }
      }
    });

    context.subscriptions.push(disposable);
  });
}

function getWebviewContent(): string {
	return  /*html*/ `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 1rem;
          }
          #prompt {
            width: 100%;
            height: 100px;
            box-sizing: border-box;
            background-color: transparent;
            font-family: 'Fira Code', monospace;
            color: #fff;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 0.5rem;
          }
          #response {
            width: 100%;
            min-height: 100px;
            box-sizing: border-box;
            border-radius: 4px;
            padding: 0.5rem;
          }
        </style>
			</head>
			<body>
				<h1>DeepSeek Chat VSCode Extension</h1>
        <textarea id="prompt" placeholder="Enter your prompt here..."></textarea>
        <div id="response"></div>
        <script>
          const prompt = document.getElementById('prompt');
          const response = document.getElementById('response');
          const vscode = acquireVsCodeApi();
          
          prompt.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              vscode.postMessage({
                command: 'chat',
                text: prompt.value,
              });
            }
          });

          window.addEventListener('message', (event) => {
            const message = event.data;
            if (message.command === 'chatResponse') {
              response.innerText = message.text;
              prompt.value = '';
            }
          });
        </script>
			</body>
		</html>
	`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
