// Require the necessary discord.js classes
const { Client, Intents, MessageAttachment } = require('discord.js');

// const { request } = require('undici');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const dotenv = require('dotenv');

dotenv.config();

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// async function getJSONResponse(body) {
//   let fullBody = '';

//   for await (const data of body) {
//     fullBody += data.toString();
//   }
//   return JSON.parse(fullBody);
// }

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'server') {
    await interaction.reply(
      `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
    );
  } else if (commandName === 'user') {
    await interaction.reply('User info.');
  } else if (commandName === 'wow') {
    const memeResult = await fetch(
      'https://owen-wilson-wow-api.herokuapp.com/wows/random'
    );
    const memeFile = await memeResult.json();
    console.log(memeFile[0]);

    const file = memeFile[0].video['1080p'];
    console.log(file);
    await interaction.reply({
      files: [{ attachment: file }],
    });
  }
});

client.on('messageCreate', async (message) => {
  if (message.content.includes('wow')) {
    const memeResult = await fetch(
      'https://owen-wilson-wow-api.herokuapp.com/wows/random'
    );
    const memeFile = await memeResult.json();
    console.log(memeFile[0]);

    const file = memeFile[0].video['1080p'];
    const attachment = new MessageAttachment(file);
    console.log(file);
    await message.reply({ content: 'You said Wow', files: [attachment] });
  }
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);
