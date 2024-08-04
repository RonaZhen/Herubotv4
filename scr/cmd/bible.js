const axios = require("axios");

module.exports = {
  config: {
    name: "bible",
    description: "Random bible verse generator",
    usage: "bible",
    cooldown: 5,
    accessableby: 0,
    category: "Motivation",
    prefix: false,
    author: "heru",
  },
  start: async function({ api, event, react, reply }) {
    try {
      react("⏱️");
      const ronapretty = await new Promise(resolve => {
        api.sendMessage('Fetching a random Bible verse, please wait...', event.threadID, (err, info) => {
          resolve(info);
        });
      });

      const res = (await axios.get(global.deku.ENDPOINT + "/bible")).data;
      let ref = res.reference;
      let verse = res.verse;
      let msg = `📖 𝙳𝚊𝚒𝚕𝚢 𝚋𝚒𝚋𝚕𝚎 𝚟𝚎𝚛𝚜𝚎\n\n${verse}\n- ${ref}`;

      await api.editMessage(msg, ronapretty.messageID);
      react("✅");
    } catch (e) {
      console.error('Error:', e);
      react("❌");
      await api.editMessage(e.message, ronapretty.messageID);
    }
  }
};
