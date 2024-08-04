module.exports = {
  config: {
    name: "edit",
    description: "Edit Bot's messages",
    usage: "reply to a message then type edit <your_message>",
    cooldown: 5,
    accessableby: 0, // Accessible to everyone
    category: "Utilities",
    prefix: false,
    author: "Yan Maglinte | Heru",// Convert by heru
  },
  start: async function({ api, event, text, react, reply }) {
    const { threadID, messageID, messageReply } = event;

    if (event.type !== "message_reply" || !messageReply) {
      return reply("Invalid input. Please reply to a bot message to edit.\n\nusage: edit [text]");
    }

    const editText = text.join(" ");
    if (!editText) {
      return reply("Invalid input. Please reply to a bot message to edit.\n\nusage: edit [text]");
    }

    try {
      await api.editMessage(editText, messageReply.messageID);
      react("✅");
    } catch (error) {
      console.error("Error editing message:", error);
      reply("An error occurred while editing the message. Please try again later.");
    }
  },
  auto: async function({ api, event, text, reply }) {
    // auto is not used in this command
  }
};
    
