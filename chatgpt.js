const https = require("https");

module.exports = function (RED) {
  function ChatGPTNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    node.on("input", async (msg, send, done) => {
      const apiKey = config.apiKey;
      const prompt = msg.payload;
      const apiUrl = "https://api.openai.com/v1/engines/text-davinci-003/completions";

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

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
      };

      const request = https.request(apiUrl, options, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          if (response.statusCode === 200) {
            const parsedData = JSON.parse(data);
            msg.payload = parsedData.choices.map((choice) => choice.text);
            send(msg);
          } else {
            node.error("ChatGPT API request failed: " + data);
          }
          done();
        });
      });

      request.on("error", (error) => {
        node.error("ChatGPT API request failed", error);
        done();
      });

      request.write(JSON.stringify(payload));
      request.end();
    });
  }

  RED.nodes.registerType("chatgpt", ChatGPTNode);
};
