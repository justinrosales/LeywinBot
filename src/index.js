require('dotenv').config();

const {Client, IntentsBitField, GuildScheduledEvent} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

// shows that bot is online in terminal 
client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);
});

// responds with "Hey!" if user says hello in chat 
client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }

    if (message.content == 'hello') {
        message.reply('Hey!');
    }
});

client.login(process.env.TOKEN);