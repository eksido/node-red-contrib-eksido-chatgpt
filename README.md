# node-red-contrib-eksido-chatgpt

A Node-RED module that integrates with OpenAI's GPT-3 API and OpenAI Chat API.

This module includes two nodes:
- `chatgpt`: A node that interacts with GPT-3 API for generating text completions.
- `openai-chat`: A node that interacts with OpenAI Chat API for multi-turn conversations.

## Installation

Run the following command in your Node-RED user directory (typically `~/.node-red`):

npm install node-red-contrib-eksido-chat



## Usage

### chatgpt Node

1. Add the `chatgpt` node to your Node-RED flow.
2. Double-click on the node to configure the required parameters:
   - API Key: Your OpenAI API key.
   - Max Tokens: The maximum number of tokens (words) in the generated text.
   - Num Responses: The number of responses to generate.
   - Stop Sequences: The character sequences to stop generating text.
   - Temperature: Controls the randomness of the generated text.
3. Connect the input and output of the `chatgpt` node to other nodes as needed.
4. Deploy your flow.

### openai-chat Node

1. Add the `openai-chat` node to your Node-RED flow 2. Double-click on the node to configure the required parameters:
   - API Key: Your OpenAI API key.
   - Model: The model to use for generating responses (e.g., "gpt-3.5-turbo").
3. Connect the input and output of the `openai-chat` node to other nodes as needed.
4. Deploy your flow.

## Input

For both nodes, the input message payload should be a string.

### chatgpt Node

- The input message payload is the prompt for the GPT-3 API.

### openai-chat Node

- The input message payload is the content of the user message to the Chat API.

## Output

The output message payload will be an array of generated text for the `chatgpt` node and an array of generated messages for the `openai-chat` node. You can use other nodes in your flow to process these outputs as needed.

## Example

Here's a simple example of using the `chatgpt` node in a flow:

1. Add an `inject` node with a string payload (e.g., "Translate the following English text to French: 'Hello, how are you?'").
2. Connect the `inject` node to a `chatgpt` node configured with your OpenAI API key and desired parameters.
3. Connect the `chatgpt` node to a `debug` node to display the generated text.
4. Deploy your flow and click on the `inject` node to trigger the GPT-3 API request.

For the `openai-chat` node, the flow would be similar, with the input message payload containing the content of the user message for the Chat API.

1. Add an `inject` node with a string payload (e.g., "Tell me a joke.").
2. Connect the `inject` node to an `openai-chat` node configured with your OpenAI API key and desired model.
3. Connect the `openai-chat` node to a `debug` node to display the generated chat messages.
4. Deploy your flow and click on the `inject` node to trigger the OpenAI Chat API request.
## License

[MIT License](LICENSE.md)