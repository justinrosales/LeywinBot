// Load environment variables from a .env file
require("dotenv").config(); // Gives access to environment variables

// Import necessary dependencies from the "discord.js" library
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

// Create a REST client for interacting with Discord's API
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

// Asynchronous function to register slash commands
(async () => {
  try {
    // Log a message indicating the registration process has started
    console.log("Registering slash commands...");

    // Use the REST client to send a PUT request to register slash commands for a specific guild
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID, // The client ID of the Discord application
        process.env.GUILD_ID // The guild ID where the slash commands will be registered
      ),
      { body: commands } // The array of slash commands to be registered (commands variable should be defined)
    );

    // Log a message indicating that slash commands were registered successfully
    console.log("Slash commands were registered successfully!");
  } catch (error) {
    // Log an error message if there is an issue during the registration process
    console.log(`There was an error: ${error}`);
  }
})();

