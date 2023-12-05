module.exports = {
  name: "ping",
  description: "Pong!",

  callback: (client, interaction) => {
    interaction.reply(`Pong! ${client.ws.ping}ms`);
  },
};
module.exports = {
  name: "nanny",
  description: "The Legend of NannyZPQ...",

  callback: (client, interaction) => {
    interaction.reply(
      `THE GOAT, MULTI-TALENTED LEAGUE ATHLETE HARDSTUCK ALL ROLES`
    );
  },
};
