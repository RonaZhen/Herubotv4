module.exports = {
  config: {
    name: "rona",
    description: "Talk to Rona AI",
    usage: "", 
    cooldown: 5, 
    accessableby: 0, 
    category: "", 
    prefix: false, 
    author: "heru",
  },
  start: async function ({ api, text, react, event, reply, User }) {
    const { get } = require("axios");
    try {
      let ask = text.join(" ");
      if (!ask) return reply("Missing prompt!");
      react("⏳");

      const heru = await new Promise(resolve => {
        api.sendMessage('Searching your question, please wait...', event.threadID, (err, info) => {
          resolve(info);
        });
      });

      const response = (
        await get("https://ronaai-v1.onrender.com/api/rona?ask=" + encodeURI(ask))
      ).data;

      react("✅");
      await api.editMessage('😝 | 𝚁𝚘𝚗𝚊 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎\n━━━━━━━━━━━━━━━━━━\n' + response.result, heru.messageID);
    } catch (e) {
      return reply(e.message);
    }
  },
  auto: async function ({ api, event, text, reply, User }) {
    // Additional auto-reply logic can be added here if needed
  }
};
