module.exports = function (RED) {
    const axios = require("axios");
  
    function ChatGPTNode(config) {
      RED.nodes.createNode(this, config);
      const node = this;
  
      node.on("input", async (msg, send, done) => {
        const apiKey = config.apiKey;
        const prompt = msg.payload;
        const apiUrl = "https://api.openai.com/v1/engines/davinci-codex/completions";
  
        const payload = {
          prompt: prompt,
          max_tokens: config.maxTokens || 7,
          n: config.numResponses || 1,
          stop: config.stopSequences || "\n",
          temperature: config.temperature || 0,
          top_p: config.topP || 1,
          stream: config.stream || false,
          logprobs: config.logprobs || null,
        };
  
        try {
          const response = await axios.post(apiUrl, payload, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`,
            },
          });
  
          msg.payload = response.data.choices.map((choice) => choice.text);
          send(msg);
        } catch (error) {
          node.error("ChatGPT API request failed", error);
        }
  
        done();
      });
    }
  
    RED.nodes.registerType("chatgpt", ChatGPTNode);
  };
  