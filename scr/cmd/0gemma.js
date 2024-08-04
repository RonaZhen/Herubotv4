module.exports = {
  config: {
    name: "gemma",
    description: "Interact with the Gemma AI",
    usage: "<query>",
    cooldown: 5,
    accessableby: 0,
    category: "AI",
    prefix: false,
    author: "heru",
  },
  start: async function ({ api, text, react, event, reply, User }) {
    const { get } = require("axios");
    try {
      // Get the user info
      const user = await User(event.senderID);
      if (!user)
        return reply(
          "User is not added to database yet, please repeat the command"
        );

      const query = text.join(" ");
      if (!query)
        return reply("Please provide a query.");

      react("⏳");

      const message = await new Promise(resolve => {
        api.sendMessage('Searching Please wait...', event.threadID, (err, info) => {
          resolve(info);
        });
      });

      const response = await get(`https://ggwp-yyxy.onrender.com/api/gemma-7b?q=${encodeURIComponent(query)}`);

      react("✅");

      await api.editMessage(`🤖 | 𝙶𝚎𝚖𝚖𝚊 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎\n━━━━━━━━━━━━━━━\n${response.data.result}\n━━━━━━━━━━━━━━━`, message.messageID);
    } catch (e) {
      return reply(`Error: ${e.message}`);
    }
  },
  auto: async function ({ api, event, text, reply, User }) {
    // Auto-reply functionality (if needed)
  }
}

