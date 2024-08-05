module["exports"] = class {
  static config = {
    name: "atom",
    description: "Talk to Atom AI",
    prefix: false,
    accessableby: 0,
    author: "heru",
  };

  static async start({ reply, text, react, api, event }) {
    const { get } = require("axios");
    try {
      let ask = text.join(" ");
      if (!ask) return reply("Missing prompt!");
      react("⏳");
      const heru = await new Promise(resolve => {
        api.sendMessage('Searching your question please wait...', event.threadID, (err, info) => {
          resolve(info);
        });
      });

      const rest = (
        await get("https://hiroshi-rest-api.replit.app/ai/atom?ask=" + encodeURI(ask))
      ).data;

      react("✅");
      await api.editMessage('⚛️ | 𝙰𝚝𝚘𝚖 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎\n━━━━━━━━━━━━━━━━━━\n' + rest.result + "\n━━━━━━━━━━━━━━━━━━", heru.messageID);
    } catch (e) {
      return reply(e.message);
    }
  }
};
