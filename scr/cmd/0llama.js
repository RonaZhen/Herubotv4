module["exports"] = class {
  static config = {
    name: "llama",
    description: "Talk to LLaMA AI",
    prefix: false,
    accessableby: 0,
    author: "Deku",
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
        await get("https://ggwp-yyxy.onrender.com" + "/api/llama-3-70b?q=" + encodeURI(ask))
      ).data;

      react("✅");
      await api.editMessage('🦙 | 𝙻𝚕𝚊𝚖𝚊 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎\n━━━━━━━━━━━━━━━━━━\n' + rest.result, heru.messageID);
    } catch (e) {
      return reply(e.message);
    }
  }
};
