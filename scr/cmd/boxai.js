module.exports = {
  config: {
    name: "boxai",
    description: "Talk to Blackbox AI",
    prefix: false,
    accessableby: 0,
    author: "heru",
  },
  start: async function({ reply, text, react, api, event }) {
    const { get } = require("axios");
    try {
      let ask = text.join(" ");
      if (!ask) return reply("Missing prompt!");
      react("⏳");
      const heru = await new Promise(resolve => {
        api.sendMessage('Searching please wait...', event.threadID, (err, info) => {
          resolve(info);
        });
      });

      const rest = (
        await get("https://ggwp-yyxy.onrender.com/api/blackboxai?q=" + encodeURIComponent(ask) + "&uid=" + event.senderID)
      ).data;

      react("✅");
      await api.editMessage('🎁 | 𝙱𝙾𝚇𝙰𝙸 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴\n━━━━━━━━━━━━━━━━━━\n' + rest.result + '\n━━━━━━━━━━━━━━━━━━\n𝙽𝚘𝚝𝚎: 𝚃𝚑𝚒𝚜 𝚒𝚜 𝚋𝚘𝚡𝚊𝚒 𝚌𝚘𝚗𝚟𝚎𝚛𝚜𝚊𝚝𝚒𝚘𝚗𝚊𝚕 𝚃𝚢𝚙𝚎 "𝚋𝚘𝚡𝚊𝚒 𝚌𝚕𝚎𝚊𝚛" 𝚒𝚏 𝚢𝚘𝚞 𝚠𝚊𝚗𝚝 𝚝𝚘 𝚌𝚕𝚎𝚊𝚛 𝚌𝚘𝚗𝚟𝚎𝚛𝚜𝚊𝚝𝚒𝚘𝚗 𝚠𝚒𝚝𝚑 𝚋𝚘𝚡𝚊𝚒.', heru.messageID);
    } catch (e) {
      return reply(e.message);
    }
  }
};
