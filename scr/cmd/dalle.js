const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "dalle",
    description: "Generate images",
    usage: "dalle <prompt>",
    cooldown: 5,
    accessableby: 0, // Accessible to everyone
    category: "Utilities",
    prefix: false,
    author: "heru",
  },
  start: async function ({ api, event, text, react, reply }) {
    const prompt = text.join(" ");
    
    if (!prompt) {
      return reply("[ ❗ ] - Missing prompt for the DALL-E command");
    }

    react("⏳");
    const initialResponse = await new Promise(resolve => {
      api.sendMessage("Generating image, please wait...", event.threadID, (err, info) => {
        if (err) {
          console.error(err);
          return reply("Sorry while processing your request.");
        }
        resolve(info);
      });
    });

    try {
      const imageResponse = await axios.get(`https://ggwp-yyxy.onrender.com/dalle?prompt=${encodeURIComponent(prompt)}`, { responseType: 'arraybuffer' });
      const imagePath = path.join(__dirname, "dalle_image.png");
      
      fs.writeFileSync(imagePath, imageResponse.data);

      await api.sendMessage({
        body: `Here is the image you requested:\n\nPrompt: ${prompt}`,
        attachment: fs.createReadStream(imagePath)
      }, event.threadID);

      fs.unlinkSync(imagePath);
      react("✅");
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
          
