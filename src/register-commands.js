require('dotenv').config(); //gives access to environment variables

const { REST, Routes } = require('discord.js');

const commands = [ 
    {
        name: 'hey',
        description: 'Replies with hey!',
    },
    {
        name: 'nanny',
        description: 'Replies with "THE GOAT, MULTI-TALENTED LEAGUE ATHLETE HARDSTUCK ALL ROLES"',
    }
];


// registers slash commands using REST 
const rest = new REST({version: '10'}).setToken(process.env.TOKEN); // <- I forgot the ";" and I was trying to debug my code for so long

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands}
      )  

      console.log('Slash commands were registered successfully!');

    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})(); 
