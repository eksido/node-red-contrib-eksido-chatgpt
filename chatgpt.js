const axios = require("axios");

module.exports = function (RED) {
  function ChatGPTNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    node.on("input", (msg, send, done) => {
      const apiKey = config.apiKey;
      const prompt = msg.payload;
      const apiUrl = "https://api.openai.com/v1/engines/davinci-codex/completions";

      const payload = {
        prompt: prompt,
        max_tokens: config.maxTokens || 50,
        n: config.numResponses || 1,
        stop: config.stopSequences || null,
        temperature: config.temperature || 0.8,
      };

      const configHeaders = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
      };

      axios.post(apiUrl, payload, configHeaders)
        .then(function (response) {
          // Handle a successful response
          msg.payload = response.data.choices.map((choice) => choice.text);
          node.send(msg);
        })
        .catch(function (error) {
          // Handle an error
          if (error.response) {
            console.error('ChatGPT API request failed with status code', error.response.status);
            console.error('Error data:', error.response.data);
            node.error(`ChatGPT API request failed with status code ${error.response.status}: ${error.response.data}`);
          } else if (error.request) {
            console.error('No response received from ChatGPT API:', error.request);
            node.error('No response received from ChatGPT API');
          } else {
            console.error('Error while setting up ChatGPT API request:', error.message);
            node.error('Error while setting up ChatGPT API request');
          }
          done();
        });
    });
  }

  RED.nodes.registerType("chatgpt", ChatGPTNode);
};