module.exports.config = {
  name: "noti",
  prefix: true,
  accessableby: 1,
  description: "Send a notification to all groups.",
  usage: "[msg]",
};

module.exports.start = async function ({ api, event, text }) {
  const message = text.join(" ");
  const threadList = await api.getThreadList(180, null, ["INBOX"]).catch((error) => {
    console.error("Failed to get Thread List:", error);
    return [];
  });

  let groupCount = 0;
  for (const thread of threadList) {
    if (thread.isGroup) {
      groupCount++;
      const threadName = thread.name || "";
      const msg = `📢 𝙉𝙊𝙏𝙄𝘾𝙀 
━━━━━━━━━━━━━━ 
➤ 『𝘋𝘦𝘷𝘦𝘭𝘰𝘱𝘦𝘳 𝘕𝘢𝘮𝘦』: heru 
━━━━━━━━━━━━━━ 
➤ 𝐓𝐡𝐫𝐞𝐚𝐝: ${threadName} 
━━━━━━━━━━━━━━ 
➤ 『𝗡𝗼𝘁𝗶𝗰𝗲』: ${message}
━━━━━━━━━━━━━━`;

      await api.sendMessage(msg, thread.threadID).catch((error) => {
        console.error("Failed to send message:", error);
      });
    }
  }

  return api.sendMessage(
    `Notification sent to ${groupCount} groups`,
    event.threadID,
    event.messageID
  );
};
    
