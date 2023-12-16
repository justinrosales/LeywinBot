const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "add",
  description: "Adds two numbers.",
  options: [
    {
      name: "first-number",
      description: "The first number.",
      type: ApplicationCommandOptionType.Number,
      choices: [
        {
          name: "one",
          value: 1,
        },
        {
          name: "two",
          value: 2,
        },
        {
          name: "three",
          value: 3,
        },
      ],
      required: true,
    },
    {
      name: "second-number",
      description: "The second number.",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],

  callback: (client, interaction) => {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;

    interaction.reply(`The sum is ${num1 + num2}`);
  },
};
