module.exports = {
  config: {
    name: "ashley",
    description: "Talk to Ashley AI",
    usage: "[query]",
    cooldown: 5,
    accessableby: 0,
    category: "Utility",
    prefix: false,
    author: "heru",
  },
  start: async function ({ api, text, react, event, reply }) {
    const axios = require("axios");
    try {
      let query = text.join(" ");
      if (!query) return reply("Missing query!");
      react("⏳");

      const heru = await new Promise(resolve => {
        api.sendMessage('Searching your question, please wait...', event.threadID, (err, info) => {
          resolve(info);
        });
      });

      const response = await axios.get(`https://markdevs-last-api-as2j.onrender.com/api/ashley?query=${encodeURIComponent(query)}`);
      const result = response.data.result;  // Ensure you get the specific property from the response

      react("✅");

      await api.editMessage(`𝑨𝑺𝑯𝑳𝑬𝒀 𝑨𝑰 🥵\n━━━━━━━━━━━━━━━━━━\n${result}\n━━━━━━━━━━━━━━━━━━`, heru.messageID);
    } catch (error) {
      react("❌");
      return reply(`${error.message}`);
    }
  },
};
