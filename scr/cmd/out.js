module.exports = {
  config: {
    name: "out",
    description: "Make the bot leave a specified group chat",
    usage: "out [threadID]",
    cooldown: 0,
    accessableby: 1, // 1 for admin only
    category: "Admin",
    prefix: true,
    author: "heru",
  },
  start: async function ({ text, api, event, reply }) {
    try {
      const adminID = '100077070762554'; // Replace with your admin user ID
      const senderID = event.senderID;

      // Check if the user is the admin
      if (senderID !== adminID) {
        return reply("You do not have permission to use this command.");
      }

      const threadID = text[0];
      if (!threadID) {
        return reply("Please provide a thread ID.");
      }

      // Send a goodbye message before leaving
      await api.sendMessage("Goodbye 👋🏻 🫂!", threadID);

      // Leave the group chat
      await api.removeUserFromGroup(api.getCurrentUserID(), threadID);
      
    } catch (error) {
      console.error("Error leaving group:", error.message);
      return reply("An error occurred while trying to leave the group.");
    }
  }
};