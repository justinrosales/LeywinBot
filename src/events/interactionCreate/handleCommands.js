// Import necessary dependencies and modules
const { devs, testServer } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");

// Define the command execution logic
module.exports = async (client, interaction) => {
  // Check if the interaction is a chat input command
  if (!interaction.isChatInputCommand()) return;

  // Get local commands from the file system
  const localCommands = getLocalCommands();

  try {
    // Find the command object corresponding to the received interaction
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    // If the command doesn't exist, exit
    if (!commandObject) return;

    // Check if the command is marked as devOnly and if the user is a developer
    if (commandObject.devOnly) {
      if (!devs.includes(interaction.member.id)) {
        // Respond with an error message if the user is not a developer
        interaction.reply({
          content: "Only developers are allowed to run this command.",
          ephemeral: true,
        });
        return;
      }
    }

    // Check if the command is marked as testOnly and if the interaction is in the test server
    if (commandObject.testOnly) {
      if (!(interaction.guild.id === testServer)) {
        // Respond with an error message if the command cannot be run in the current server
        interaction.reply({
          content: "This command cannot be ran here.",
          ephemeral: true,
        });
        return;
      }
    }

    // Check if specific permissions are required to run the command
    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          // Respond with an error message if the user lacks the required permissions
          interaction.reply({
            content: "Not enough permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    // Check if the bot has the necessary permissions to execute the command
    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(permission)) {
          // Respond with an error message if the bot lacks the required permissions
          interaction.reply({
            content: "I don't have enough permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    // Execute the command callback function
    await commandObject.callback(client, interaction);
  } catch (error) {
    // Log any errors that occur during command execution
    console.log(`There was an error running this command: ${error}`);
  }
};
