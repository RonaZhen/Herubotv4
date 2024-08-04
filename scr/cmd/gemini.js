module.exports = {
  config: {
    name: "gemini",
    accessibleby: 0,
    credits: "Deku", //https://facebook.com/joshg101
    description: "Talk to Gemini (conversational)",
    usage: "[ask / reply to an image with ask]",
    prefix: false,
    category: "AI",
  },
  start: async function ({ event, text, reply, react }) {
    const axios = require("axios");
    let prompt = text.join(" "),
      uid = event.senderID,
      url;
    if (!prompt) return reply(`Please enter a prompt.`);
    react('✨');
    try {
      const api = global.deku.ENDPOINT;
      if (event.type == "message_reply"){
        if (event.messageReply.attachments[0]?.type == "photo"){
        url = encodeURIComponent(event.messageReply.attachments[0].url);
        const res = (await axios.get(api + "/gemini?prompt="+prompt+"&url="+url+"&uid="+uid)).data;
        return reply(res.gemini)
        } else {
          return reply('Please reply to an image.')
        }
      }
      const rest = (await axios.get(api + "/new/gemini?prompt=" + encodeURI(prompt))).data;
      return reply(rest.result.data);
    } catch (e) {
      console.log(e);
      return reply(e.message);
    } //end of catch
  }, // end of start
}; // end of exports