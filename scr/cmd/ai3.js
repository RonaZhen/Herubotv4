const axios = require('axios');

module.exports = {
  config: {
    name: "ai3",
    description: "Interact with GPT-4 AI",
    usage: "gpt [prompt]",
    cooldown: 3,
    accessableby: 0, // Accessible to everyone
    category: "AI",
    prefix: false, // Command doesn't need a prefix
    author: "heru",
  },
  start: async function({ api, event, text, react, reply }) {
    const prompt = text.join(" ");
    const userID = "100";

    if (!prompt) {
      return reply('Please provide a question. Usage: ai3 [question]');
    }

    const chill = await new Promise(resolve => {
      api.sendMessage('Searching Please wait...', event.threadID, (err, info) => {
        resolve(info);
      });
    });

    const apiUrl = `https://markdevs-last-api-as2j.onrender.com/gpt4?prompt=${encodeURIComponent(prompt)}&uid=${encodeURIComponent(userID)}`;

    try {
      const hot = await axios.get(apiUrl);
      const result = hot.data;
      const aiResponse = result.gpt4;
      const formattedResponse = `🤖 𝐆𝐏𝐓𝟒+ 𝐂𝐎𝐍𝐓𝐈𝐍𝐔𝐄𝐒 𝐀𝐈\n━━━━━━━━━━━━━━━━━━\n${aiResponse}\n━━━━━━━━━━━━━━━━━━`;

      try {
        await api.editMessage(formattedResponse, chill.messageID);
      } catch (error) {
        console.error('Error editing message:', error);
        api.sendMessage('Error editing message: ' + error.message, event.threadID, event.messageID);
      }
    } catch (error) {
      console.error('Error:', error);
      await api.editMessage('Error: ' + error.message, chill.messageID);
    }
  },
  auto: async function({ api, event, text, reply }) {
    // This function is not used for this command
  }
};
