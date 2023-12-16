// Load environment variables from a .env file
require("dotenv").config();

// Import necessary dependencies from the "discord.js" library
const {
  Client,
  IntentsBitField,
  GuildScheduledEvent,
  MembershipScreeningFieldType,
} = require("discord.js");

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

// Attach event handlers to the client using the event handler function
eventHandler(client);

// Log in to Discord using the bot token from the environment variables
client.login(process.env.TOKEN);
