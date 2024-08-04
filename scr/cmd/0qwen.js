module.exports = {
  config: {
    name: "qwen",
    description: "Interact with the Qwen AI",
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

      const response = await get(`https://ggwp-yyxy.onrender.com/ai/qwen1.5-14b?q=${encodeURIComponent(query)}&uid=${user.id}`);

      react("✅");

      await api.editMessage(`🤖 | 𝚀𝚠𝚎𝚗 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎\n━━━━━━━━━━━━━━━\n${response.data.result}\n━━━━━━━━━━━━━━━\n𝚃𝚢𝚙𝚎 "𝚚𝚠𝚎𝚗 𝚌𝚕𝚎𝚊𝚛" 𝚒𝚏 𝚢𝚘𝚞 𝚠𝚊𝚗𝚝 𝚝𝚘 𝚌𝚕𝚎𝚊𝚛 𝚌𝚘𝚗𝚟𝚎𝚛𝚜𝚊𝚝𝚒𝚘𝚗 𝚠𝚒𝚝𝚑 𝚚𝚠𝚎𝚗.`, message.messageID);
    } catch (e) {
      return reply(`Error: ${e.message}`);
    }
  },
  auto: async function ({ api, event, text, reply, User }) {
    // Auto-reply functionality (if needed)
  }
}

