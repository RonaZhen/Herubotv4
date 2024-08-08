module.exports = {
  config: {
    name: "rona2",
    description: "Talk to Horny AI",
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
      if (!ask) return reply("Provide a query to talk Rona horny Ai!");
      react("⏳");

      const heru = await new Promise(resolve => {
        api.sendMessage('🥵 Rona is thinking....', event.threadID, (err, info) => {
          resolve(info);
        });
      });

      const response = (
        await get("https://ronaaihornyai.onrender.com/api/rona?ask=" + encodeURI(ask))
      ).data;

      react("✅");
      await api.editMessage('🥵 𝚁𝚘𝚗𝚊 𝙰𝙸(𝙷𝚘𝚛𝚗𝚢)\n━━━━━━━━━━━━━━━━━━\n' + response.result, heru.messageID);
    } catch (e) {
      return reply(e.message);
    }
  },
  auto: async function ({ api, event, text, reply, User }) {
    // Additional auto-reply logic can be added here if needed
  }
};
