const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "emi",
    description: "Generate an image based on a prompt",
    usage: "emi <prompt>",
    cooldown: 5,
    accessableby: 0, // Accessible to everyone
    category: "Utilities",
    prefix: false,
    author: "heru",
  },
  start: async function ({ api, event, text, react, reply }) {
    const prompt = text.join(" ");
    
    if (!prompt) {
      return reply("[ ❗ ] - Missing prompt for the EMI command");
    }

    react("⏳");
    const initialResponse = await new Promise(resolve => {
      api.sendMessage("Generating image, please wait...", event.threadID, (err, info) => {
        if (err) {
          console.error(err);
          return reply("Sorry error while processing your request.");
        }
        resolve(info);
      });
    });

    try {
      const imageResponse = await axios.get(`https://ggwp-yyxy.onrender.com/emi?prompt=${encodeURIComponent(prompt)}`, { responseType: 'arraybuffer' });
      const imagePath = path.join(__dirname, "emi_image.png");
      
      fs.writeFileSync(imagePath, imageResponse.data);

      await api.sendMessage({
        body: `Here is the image generated for your prompt:\n\nPrompt: ${prompt}`,
        attachment: fs.createReadStream(imagePath)
      }, event.threadID, async () => {
        fs.unlinkSync(imagePath);
        react("✅");
      });
    } catch (error) {
      console.error('Error:', error);
      react("❌");
      await reply('An error occurred while processing your request.');
    }
  },
  auto: async function ({ api, event, text, reply }) {
    // auto is not used in this command
  }
};
                                              
