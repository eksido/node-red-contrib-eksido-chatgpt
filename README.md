# node-red-contrib-eksido-chatgpt

A Node-RED node that integrates with OpenAI's ChatGPT API.

## Installation

Install `node-red-contrib-eksido-chatgpt` using npm:

\```bash
npm install node-red-contrib-eksido-chatgpt
\```

## Usage

This node allows you to generate text using the ChatGPT API in your Node-RED flows.

1. Drag and drop the `chatgpt` node into your flow.
2. Double-click the node to configure the API key and other settings.
3. Connect the input to the node, typically from an inject node with a string payload containing the prompt.
4. Connect the output of the node to other nodes, such as a debug node, to display the generated text.

### Configuration

The `chatgpt` node has the following configuration options:

- **API Key**: Your OpenAI API key (required).
- **Max tokens**: The maximum number of tokens (words) to generate (default: 50).
- **Num responses**: The number of responses to generate for each prompt (default: 1).
- **Stop sequences**: A comma-separated list of strings that indicate the end of a generated response (default: none).
- **Temperature**: Controls the randomness of the generated text. Higher values make the output more random, lower values make it more deterministic (default: 0.8).

## Example

An example flow is included with the package, demonstrating a simple usage of the `chatgpt` node. To import the example, click the Node-RED menu, select "Import", and then "Examples". The example flow can be found under the "node-red-contrib-eksido-chatgpt" category.
