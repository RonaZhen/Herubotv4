module.exports.start = async function ({ api, event }) {
  const time = process.uptime();
  const hours = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time % (60 * 60)) / 60);
  const seconds = Math.floor(time % 60);
  return api.shareContact("Heru bot is running " + hours + " hour(s), " + minutes + " minute(s), and " + seconds + " second(s)", api.getCurrentUserID(), event.threadID);
};
module.exports.config = {
  name: "upt",
  prefix: false,
  accessibleby: 0,
  description: "Upt",
  credits: "Deku",
  category: "system",
};
