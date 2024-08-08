module.exports = {
  config: {
    name: "trans", 
    description: "Text translation",
    usage: "trans [tl, en] [prompt]",
    cooldown: 5, 
    accessableby: 0, 
    category: "", 
    prefix: false, 
    author: "heru",
  },
  start: async function ({ api, event, text, reply }) {
    const request = require("request");
    const targetLanguage = text[0];
    const content = text.slice(1).join(" ");

    try {
      if (content.length === 0 && event.type !== "message_reply") {
        return reply(`Please provide a text to translate or reply to a message.\n\nExample: trans tl what is life`);
      }

      let translateThis, lang;
      if (event.type === "message_reply") {
        translateThis = event.messageReply.body;
        lang = targetLanguage || 'tl';
      } else {
        translateThis = content;
        lang = targetLanguage || 'tl';
      }

      request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${translateThis}`), (err, response, body) => {
        if (err) {
          return reply("An error has occurred!");
        }

        const retrieve = JSON.parse(body);
        let text = '';
        retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');

        const fromLang = (retrieve[2] === retrieve[8][0][0]) ? retrieve[2] : retrieve[8][0][0];
        reply(`Translation: ${text}\n - Translated from ${fromLang} to ${lang}`);
      });
    } catch (error) {
      reply(error.message);
    }
  },
};
