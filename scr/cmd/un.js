module.exports.config = {
  name: "un",
  usage: "[reply]",
  accessableby: 0,
  prefix: false,
  description: "Unsent bot message."
};

module.exports.start = async function ({ api, event, reply }) {
  if (event.messageReply.senderID != api.getCurrentUserID())
    return reply("I can't unsend from other message.");
  if (event.type != "message_reply") return reply("Reply to bot message");
  return api.unsendMessage(event.messageReply.messageID, (err) =>
    err ? reply("Something went wrong.") : "",
  );
};
