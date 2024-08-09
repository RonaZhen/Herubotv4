module["exports"] = class {
  static config = {
    name: "ai",
    description: "Talk to Gemini (conversational)",
    usage: "[ask / reply to an image with ask]",
    cooldown: 5,
    accessableby: 0,
    category: "AI",
    prefix: false,
    author: "heru",
  };

  static async start({ event, text, reply, react, api }) {
    const axios = require("axios");
    let prompt = text.join(" "),
      uid = event.senderID,
      url;

    if (!prompt) return reply("Please enter a prompt.");
    react("🕛");

    const waitingMessage = await new Promise((resolve) => {
      api.sendMessage("Searching, please wait...", event.threadID, (err, info) => {
        resolve(info);
      });
    });

    try {
      const apiEndpoint = global.deku.ENDPOINT;

      if (event.type === "message_reply") {
        if (event.messageReply.attachments[0]?.type === "photo") {
          url = encodeURIComponent(event.messageReply.attachments[0].url);

          await api.editMessage("Analyzing image...", waitingMessage.messageID);

          const res = (
            await axios.get(
              apiEndpoint +
                "/gemini?prompt=" +
                prompt +
                "&url=" +
                url +
                "&uid=" +
                uid
            )
          ).data;

          react("✅");
          return reply(res.gemini);
        } else {
          return reply("Please reply to an image.");
        }
      }

      const rest = (
        await axios.get(
          apiEndpoint + "/new/gemini?prompt=" + encodeURI(prompt)
        )
      ).data;

      react("✅");
      await api.editMessage(
        "🌟 𝙰𝙸 𝙰𝚜𝚜𝚒𝚜𝚝𝚊𝚗𝚝\n━━━━━━━━━━━━━━━━━━\n" + rest.result.data,
        waitingMessage.messageID
      );
      
    } catch (e) {
      console.log(e);
      return reply(e.message);
    }
  }
};
