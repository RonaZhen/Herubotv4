const axios = require('axios');
const { TempMail } = require("1secmail-api");

module.exports = {
  config: {
    name: "tempmail",
    description: "Generates random email from www.1secmail.com and fetches messages from inbox",
    usage: "[count (optional)] or inbox [email] [message limit to show (optional)]",
    cooldown: 5,
    accessableby: 0, // Accessible to everyone
    category: "Accounting",
    prefix: false,
    author: "Kenneth Panio | Heru",
  },
  start: async function({ api, event, text, react, reply }) {
    const TEMP_MAIL_URL = 'https://www.1secmail.com/api/v1/';
    const MAX_EMAIL_COUNT = 10;
    const DEFAULT_DISPLAY_LIMIT = 5;

    function generateRandomId() {
      const length = 6;
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let randomId = '';

      for (let i = 0; i < length; i++) {
        randomId += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      return randomId;
    }

    try {
      if (text[0] === 'inbox') {
        if (!text[1]) {
          return reply("Please provide an email address for the inbox.");
        }

        const [username, domain] = text[1].replace(/\(\.\)/g, '.').split('@');
        const inboxResponse = await axios.get(`${TEMP_MAIL_URL}?action=getMessages&login=${username}&domain=${domain}`);
        const messages = inboxResponse.data;

        if (!messages || messages.length === 0) {
          return reply(`No messages found for ${text[1]}.`);
        }

        const displayLimit = text[2] || DEFAULT_DISPLAY_LIMIT;
        const limitedMessages = messages.slice(0, displayLimit);

        let messageText = '';
        for (const message of limitedMessages) {
          const messageDetails = await axios.get(`${TEMP_MAIL_URL}?action=readMessage&login=${username}&domain=${domain}&id=${message.id}`);
          const detailedMessage = messageDetails.data;
          const attachments = detailedMessage.attachments.map(attachment => `📎 Attachment: ${attachment.filename} (${attachment.size} bytes)`).join('\n');

          messageText += `👤 𝗦𝗘𝗡𝗗𝗘𝗥: ${detailedMessage.from}\n🎯 𝗦𝗨𝗕𝗝𝗘𝗖𝗧: ${detailedMessage.subject || 'No Subject 🎯'}\n📅 𝗗𝗔𝗧𝗘: ${detailedMessage.date}\n\n${detailedMessage.textBody || detailedMessage.body}\n\n${attachments}\n\n`;
        }

        await reply(`Successful! Displaying the latest ${displayLimit} Inbox 📥.`);
        await reply(messageText);
        react("📮");
      } else {
        const count = Math.min(text[0] || 1, MAX_EMAIL_COUNT);
        if (count > MAX_EMAIL_COUNT) return reply(`Maximum allowed count is ${MAX_EMAIL_COUNT}.`);

        const generatedEmails = (await axios.get(`${TEMP_MAIL_URL}?action=genRandomMailbox&count=${count}`)).data.map(email => `${email.replace(/\./g, '(.)')}`).join('\n');
        const mail = new TempMail(generateRandomId());
        
        await reply(generatedEmails);
        await reply(`Extra: ${mail.address}`);
      }
    } catch (error) {
      react("⚠️");
      console.error('Error:', error);
      await reply("Failed to generate or retrieve email, please try again.");
    }
  },
  auto: async function({ api, event, text, reply }) {
    // auto is not used in this command
  }
};
    
