module.exports = {
  config: {
    name: "boxai2",
    description: "Get a response from the Blackbox API",
    usage: "<prompt>",
    cooldown: 5,
    accessableby: 0,
    category: "Utility",
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

      const response = await get(`https://ggwp-yyxy.onrender.com/blackbox?prompt=${encodeURIComponent(prompt)}`);

      react("✅");

      await api.editMessage(`🎁 | 𝙱𝙾𝚇𝙰𝙸 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴\n━━━━━━━━━━━━━━━\n${response.data.data}\n━━━━━━━━━━━━━━━`, message.messageID);
    } catch (e) {
      return reply(`Error: ${e.message}`);
    }
  },
  auto: async function ({ api, event, text, reply, User }) {
    // Auto-reply functionality (if needed)
  }
}

