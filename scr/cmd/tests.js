module.exports = {
  config: {
    name: "t",
    description: "test",
    prefix: false,
    usage: "[test]",
    accessableby: 0,
  },
  start: async function ({ event, reply, User }) {
    const user = await User(event.senderID);
    if (!user)
      return reply(
        "User is not added to database yet, please repeat the command",
      );
    let msg =
      "Name: " +
      user.name +
      "\nGender: " +
      user.gender +
      "\nFacebook: " +
      user.uri;
    reply(msg);
  },
};
