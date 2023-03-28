module.exports = function (RED) {
    const https = require("https");
  
    function OpenAIChatNode(config) {
      RED.nodes.createNode(this, config);
      const node = this;
  
      node.on("input", async (msg, send, done) => {
        const apiKey = config.apiKey;
        const messages = msg.payload;
        const apiUrl = new URL("/v1/chat/completions", "https://api.openai.com");
  
        const payload = {
          model: "gpt-3.5-turbo",
          messages: messages,
        };
  
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
        };
  
        try {
          const req = https.request(apiUrl, options, (res) => {
            let data = "";
  
            res.on("data", (chunk) => {
              data += chunk;
            });
  
            res.on("end", () => {
              if (res.statusCode >= 200 && res.statusCode < 300) {
                const response = JSON.parse(data);
                msg.payload = response.choices[0].message.content;
                send(msg);
              } else {
                node.error(`Open AI Chat API request failed: ${data}`, msg);
            }
            done();
            });
            });
            req.on("error", (error) => {
                node.error("OpenAI Chat API request failed", error);
                done();
              });
          
              req.write(JSON.stringify(payload));
              req.end();
            } catch (error) {
              node.error("OpenAI Chat API request failed", error);
              done();
            }
          });
          }
          
          RED.nodes.registerType("openai-chat", OpenAIChatNode);
          };
          