// Import necessary dependencies and utility functions
const path = require("path");
const getAllFiles = require("../utils/getAllFiles");

// Define a function to dynamically load and attach event handlers to the client
module.exports = (client) => {
  // Get all event folders within the "events" directory
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

  // Iterate through each event folder
  for (const eventFolder of eventFolders) {
    // Get all event files within the current event folder
    const eventFiles = getAllFiles(eventFolder);

    // Sort event files alphabetically
    eventFiles.sort((a, b) => a > b);

    // Extract the event name from the event folder path
    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

    // Attach event listeners for the current event
    client.on(eventName, async (arg) => {
      // Iterate through each event file for the current event
      for (const eventFile of eventFiles) {
        // Dynamically require and execute the event function
        const eventFunction = require(eventFile);
        await eventFunction(client, arg);
      }
    });
  }
};
