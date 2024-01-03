// Load environment variables from a .env file
require("dotenv").config();

// Import necessary dependencies from the "discord.js" library
const {
  Client,
  IntentsBitField,
  GuildScheduledEvent,
  MembershipScreeningFieldType,
} = require("discord.js");

// added mongoose to connect to database
const mongoose = require("mongoose");

// Import the event handler function
const eventHandler = require("./handlers/eventHandler");

// Create a new Discord client instance with specified intents
const client = new Client({
  // Intents define the permissions your bot has in a Discord server
  intents: [
    IntentsBitField.Flags.Guilds, // Access to server information
    IntentsBitField.Flags.GuildMembers, // Access to member information
    IntentsBitField.Flags.GuildMessages, // Access to message-related events
    IntentsBitField.Flags.MessageContent, // Access to message content
  ],
});

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Database.");

    eventHandler(client);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();

// Log in to Discord using the bot token from the environment variables
client.login(process.env.TOKEN);
