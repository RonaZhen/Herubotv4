module.exports = {
  config: {
    name: "catgpt",
    description: "Interact with the CatGPT AI",
    usage: "<prompt>",
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

      const prompt = text.join(" ");
      if (!prompt)
        return reply("Please provide a prompt.");

      react("⏳");

      const message = await new Promise(resolve => {
        api.sendMessage('Searching Please wait...', event.threadID, (err, info) => {
          resolve(info);
        });
      });

      const response = await get(`https://ggwp-yyxy.onrender.com/api/catgpt?prompt=${encodeURIComponent(prompt)}`);

      react("✅");

      await api.editMessage(`🐱 | 𝙲𝚊𝚝𝙶𝙿𝚃 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎\n━━━━━━━━━━━━━━━\n${response.data.result}\n━━━━━━━━━━━━━━━`, message.messageID);
    } catch (e) {
      return reply(`Error: ${e.message}`);
    }
  },
  auto: async function ({ api, event, text, reply, User }) {
    // Auto-reply functionality (if needed)
  }
}

