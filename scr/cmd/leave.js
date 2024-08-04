const adminID = "100077070762554"; // Replace with your actual admin user ID

module.exports.config = {
  name: "leave",
  accessableby: 0,
  author: "heru",
  description: "Bot leaves the group",
  usage: "",
  prefix: true
};

module.exports.start = async function ({ api, event }) {
  const senderID = event.senderID;

  // Check if the sender is the admin
  if (senderID !== adminID) {
    return api.sendMessage("You do not have permission to use this command.", event.threadID, event.messageID);
  }

  try {
    await api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
    return api.sendMessage("Goodbye! The bot has left the group.", event.threadID, event.messageID);
  } catch (error) {
    return api.sendMessage(`Failed to leave the group. Error: ${error.message}`, event.threadID, event.messageID);
  }
};