module.exports = {
  config: {
    name: "getlink",
    description: "Get link of the replied image or video",
    usage: "getlink",
    cooldown: 5,
    accessableby: 0,
    category: "utility",
    prefix: false,
    author: "heru",
  },

  start: async function({ api, event, reply }) {
    const { messageReply } = event;

    if (event.type !== "message_reply" || !messageReply.attachments || messageReply.attachments.length !== 1) {
      return reply("<Reply with image or video>");
    }

    return reply(messageReply.attachments[0].url);
  }
};