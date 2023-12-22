const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "embed",
  description: "Aincrad welcome embed.",

  callback: (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle("Welcome to Aincrad")
      .setDescription(
        "Our majestic land, where the gentle rhythm of our oceans welcomes you to a safe haven."
      )
      .setColor("Random")
      .setImage("https://i.imgur.com/5MKAdR6.jpg");

    interaction.reply({ embeds: [embed] });
  },
};
