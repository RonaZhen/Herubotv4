const axios = require('axios');

module.exports = {
  config: {
    name: "ai",
    description: "Interact with Adobo GPT AI",
    prefix: false,
    usage: "[query]",
    accessableby: 0,
    category: "AI",
    author: "heru"
  },
  start: async function ({ text, reply, react, event, api }) {
    const query = text.join(' ');

    if (!query) {
      return reply('Please provide a query.');
    }

    react('⏳');

    try {
      const heru = await new Promise(resolve => {
        api.sendMessage('Searching Please wait...', event.threadID, (err, info) => {
          resolve(info);
        });
      });

      const response = await axios.get(`https://markdevs69.vercel.app/api/adobo/gpt?query=${encodeURIComponent(query)}`);
      const result = response.data.result;

      try {
        await api.editMessage("🤖 𝙰𝚒 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎\n━━━━━━━━━━━━━━━━━━\n" + result + "\n━━━━━━━━━━━━━━━━━━", heru.messageID);
      } catch (error) {
        console.error('Error:', error);
        api.sendMessage('Error: ' + error.message, event.threadID, event.messageID);
      }

      react('✅');
    } catch (error) {
      react('❌');
      return reply(`An error occurred: ${error.message}`);
    }
  }
};