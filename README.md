# deepseek-chat-ext 

A for fun project to try out deepseek-r1:7b as a local VS Code extension

Scaffolded using [Yo Code VS Code Extension Generator](https://code.visualstudio.com/api/get-started/your-first-extension)

**Only meant to be run locally**

## Getting Started

### Prerequisites
* pnpm or npm
  - If you don't have pnpm installed, you can install it by running:
    ```
    npm install -g pnpm
    ```
* Node.js - at least v18.12 (for pnpm)

* VS Code - at least 1.96.0 (you can also use Cursor or other IDEs that are a fork of VS Code)
  - Check your VS Code version in VS Code and Cursor by navigating to `Help > About`
  - If you don't have at least 1.96.0, you can update it by going to `Help > Check for Updates`
    - Otherwise, you can update the values in the `engines` section and `devDependencies` in the `package.json` file to your current version
  
* [Ollama](https://ollama.com/download)
  - after installing ollama, you can start the ollama server using deepseek-r1 7b model by running `ollama run deepseek-r1:7b`
  - if you want to use a different model, you can change the `model` variable in the `src/extension.ts` file on line 34
    - you will also need to run the ollama server with the new model by running `ollama run <model>`

### Setup

1. Clone the repository
    ```
    git clone https://github.com/crod951/deepseek-chat-ext.git
    ```
2. Install dependencies
    ```
    pnpm install
    ```
3. Compile the extension
    ```
    pnpm run compile
    ```

### How to run the extension
1. Press `F5` to start debugging the extension
    - If you don't see the `Debug` view, you can open it by clicking on the `Debug` icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+D`.
      - Select `Run Extension` from the dropdown menu.
      - Click the green play button to start debugging the extension.
2. This will open a new VS Code or Cursor window with the extension loaded.
3. Show the command palette by pressing `Ctrl+Shift+P` and search for `DeepSeek Chat` to find the extension.
4. Click on the `DeepSeek Chat` command to start the extension.
5. You should see a new panel with the DeepSeek Chat interface.
6. Enter a message and press `Enter` to send it to the DeepSeek Chat model.
7. The response will be displayed in the panel.

**Enjoy!**

## TODO
- [x] Initial setup and scaffold
- [ ] Update styling of the chat panel
