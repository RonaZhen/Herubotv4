const fs = require("fs");
const axios = require("axios");

module.exports = {
  config: {
    name: "help",
    accessableby: 0,
    usage: "[page]",
    prefix: false
  },
  start: async function ({ text, reply, senderID }) {
    try {
      const path = process.cwd() + "/scr/cmd";
      const files = fs.readdirSync(path);
      const commands = files
        .filter(file => file.endsWith(".js"))
        .map(file => require(`${path}/${file}`).config);

      let page;
      let commandsPerPage;
      let output = "";
      
      // Assuming you have a way to get the user's name from senderID
      const userName = "User"; // Replace this with actual logic to get user's name

      // Fetch a cat fact from the API
      const response = await axios.get('https://meowfacts.herokuapp.com/');
      const catFact = response.data.data[0];

      if (text[0] === "all") {
        output += `Hey ${userName}, these are commands that may help you:\n\n`;
        output += "╭─❍「 SYSTEM 」\n";
        commands.forEach(command => {
          output += `│ ✧ ${command.name}\n`;
        });
        output += "╰───────────⟡\n\n";
        output += `├─────☾⋆\n│ » Total commands: [ ${commands.length} ]\n`;
        output += `│「 ☾⋆ PREFIX: - 」\n╰──────────⧕\n\n`;
        output += `𝗖𝗔𝗧 𝗙𝗔𝗖𝗧: ${catFact}`;
      } else {
        page = parseInt(text[0], 10) || 1;
        commandsPerPage = 10;
        const totalPages = Math.ceil(commands.length / commandsPerPage);

        if (page < 1 || page > totalPages) return reply("Invalid page number.");

        const startIndex = (page - 1) * commandsPerPage;
        const commandList = commands.slice(startIndex, startIndex + commandsPerPage);

        output += `Hey ${userName}, these are commands that may help you:\n\n`;
        output += "╭─❍「 LIST 」\n";
        commandList.forEach(command => {
          output += `│ ✧ ${command.name}\n`;
        });
        output += "╰───────────⟡\n\n";
        output += `├─────☾⋆\n│ » Total commands: [ ${commands.length} ]\n`;
        output += `│「 ☾⋆ PREFIX: - 」\n╰──────────⧕\n\n`;
        output += `𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙿𝙰𝙶𝙴 : <${page}/${totalPages}>\n\n`;
        output += `𝗖𝗔𝗧 𝗙𝗔𝗖𝗧: ${catFact}`;
      }

      return reply({ body: output });
    } catch (error) {
      return reply(error.message);
    }
  }
};
