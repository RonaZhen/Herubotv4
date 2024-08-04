module.exports = {
  config: {
    name: "ask",
    description: "AI",
    usage: "[prompt]",
    cooldown: 0,
    accessableby: 0,
    category: "AI",
    prefix: false,
    author: "kim | heru",
  },
  start: async function ({ api, text, react, event, reply }) {
    const { get } = require("axios");

    try {
      const prompt = text.join(" ");
      if (!prompt) {
        return reply("Hey, I'm your virtual assistant. Ask me a question.");
      }

      react("⏳");
      const initialMessage = await new Promise(resolve => {
        api.sendMessage("Searching your question, please wait...", event.threadID, (err, info) => {
          resolve(info);
        });
      });

      const response = await get(`https://hiro-ai.vercel.app/ai?ask=${encodeURIComponent(prompt)}`);
      const answer = response.data.response;

      react("✅");
      await api.editMessage(`🧠 𝗕𝗢𝗧 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘\n━━━━━━━━━━━━━━━━━━\n${answer}\n━━━━━━━━━━━━━━━━━━\n- 𝗥𝗢𝗡𝗔 𝗗𝗘𝗩`, initialMessage.messageID);
    } catch (error) {
      console.error("Error:", error.message);
      return reply("An error occurred. Please try again.");
    }
  },
  auto: async function ({ api, event, text, reply }) {
    // Auto reply function (if needed)
  }
};