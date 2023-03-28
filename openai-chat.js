module.exports = function (RED) {
    const axios = require("axios");
  
    function OpenAIChatNode(config) {
      RED.nodes.createNode(this, config);
      const node = this;
  
      node.on("input", async (msg, send, done) => {
        const apiKey = config.apiKey;
        const messages = msg.payload;
        const apiUrl = "https://api.openai.com/v1/chat/completions";
  
        const payload = {
          model: config.model || "gpt-3.5-turbo",
          messages: messages,
        };
  
        try {
          const response = await axios.post(apiUrl, payload, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`,
            },
          });
  
          msg.payload = response.data.choices[0].message.text;
          send(msg);
        } catch (error) {
          node.error("OpenAI Chat API request failed", error);
        }
  
        done();
      });
    }
  
    RED.nodes.registerType("openai-chat", OpenAIChatNode);
  };
  