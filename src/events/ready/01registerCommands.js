// Import necessary dependencies and utility functions
const { testServer } = require("../../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

// Define a function to synchronize local commands with application commands
module.exports = async (client) => {
  try {
    // Retrieve local and application commands
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(
      client,
      testServer
    );

    // Iterate through each local command
    for (const localCommand of localCommands) {
      // Extract relevant properties from the local command
      const { name, description, options } = localCommand;

      // Find the corresponding command in the application commands cache
      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      );

      // Check if the command already exists
      if (existingCommand) {
        // If the local command is marked as deleted, delete the corresponding application command
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`Deleted Command "${name}".`);
          continue;
        }

        // If the local and application commands are different, update the application command
        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });
          console.log(`Edited Command "${name}".`);
        }
      } else {
        // If the local command is marked as deleted, skip registration
        if (localCommand.deleted) {
          console.log(
            `Skipping Registering Command "${name}" as it's been set to delete.`
          );
          continue;
        }

        // Create a new application command if it doesn't exist
        await applicationCommands.create({
          name,
          description,
          options,
        });
        console.log(`Registered Command "${name}".`);
      }
    }
  } catch (error) {
    // Log any errors that occur during the synchronization process
    console.log(`There was an error: ${error}`);
  }
};
