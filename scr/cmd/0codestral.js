module["exports"] = class {
  static config = {
    name: "codestral",
    description: "Talk to Codestral AI",
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
        await get("https://ggwp-yyxy.onrender.com/api/codestral?q=" + encodeURI(ask))
      ).data;

      react("✅");
      await api.editMessage('🧑‍💻 | 𝙲𝚘𝚍𝚎𝚜𝚝𝚛𝚊𝚕 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎\n━━━━━━━━━━━━━━━━━━\n' + rest.result + "\n━━━━━━━━━━━━━━━━━━", heru.messageID);
    } catch (e) {
      return reply(e.message);
    }
  }
};