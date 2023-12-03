require("dotenv").config();

// the necessary intents (perms for discord bot)
const {
  Client,
  IntentsBitField,
  GuildScheduledEvent,
  MembershipScreeningFieldType,
} = require("discord.js");
const eventHandler = require("./handlers/eventHandler");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

eventHandler(client);

client.login(process.env.TOKEN);

/*

// ~~ TEMPORARY CODE GONNA CHANGE LATER ~~ 

// shows that bot is online in terminal
client.on("ready", (c) => {
  console.log(`😊 ${c.user.tag} is online.`);
});

// responds with "Hey!" if user says hello in chat
client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content == "hello") {
    message.reply("Hey!");
  }
});

// custom responses if user uses slash commands
client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  // console.log(interaction.commandName) <- used for debugging


  if (interaction.commandName === "hey") {
    interaction.reply("hey!");
  }
  
  if (interaction.commandName === "nanny") {
    interaction.reply(
      "THE GOAT, MULTI-TALENTED LEAGUE ATHLETE HARDSTUCK ALL ROLES"
    );
  }


  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;

    interaction.reply(`The sum is ${num1 + num2}`);
    console.log(num1);
  }
});
*/
