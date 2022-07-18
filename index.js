// Require the necessary discord.js classes
const {
  Client,
  Intents,
  Collection,
  MessageAttachment,
} = require('discord.js');
const fs = require('node.fs');
const path = require('node:path');

// const { request } = require('undici');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const dotenv = require('dotenv');

dotenv.config();

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

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

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

//   const { commandName } = interaction;

//   if (commandName === 'meme') {
//     const memeResult = await fetch(
//       'https://meme-api.herokuapp.com/gimme/memes'
//     );
//     const memeFile = await memeResult.json();

//     const file = memeFile.url;
//     console.log(file);
//     await interaction.reply({
//       files: [{ attachment: file }],
//     });
//   } else if (commandName === 'cat') {
//     const memeResult = await fetch('https://meowfacts.herokuapp.com');
//     const memeFile = await memeResult.json();
//     console.log(memeFile);

//     const file = memeFile.data;
//     // console.log(file);
//     await interaction.reply(`${file}`);
//   } else if (commandName === 'chuck') {
//     const memeResult = await fetch('https://api.chucknorris.io/jokes/random');
//     const memeFile = await memeResult.json();

//     const file = memeFile.value;
//     console.log(file);
//     await interaction.reply(`${file}`);
//   } else if (commandName === 'wow') {
//     const memeResult = await fetch(
//       'https://owen-wilson-wow-api.herokuapp.com/wows/random'
//     );
//     const memeFile = await memeResult.json();
//     console.log(memeFile[0]);

//     const file = memeFile[0].video['1080p'];
//     console.log(file);
//     await interaction.reply({
//       files: [{ attachment: file }],
//     });
//   }
// });

// client.on('messageCreate', async (message) => {
//   if (message.content.includes('wow')) {
//     if (message.author.bot) {
//       return;
//     }
//     const memeResult = await fetch(
//       'https://owen-wilson-wow-api.herokuapp.com/wows/random'
//     );
//     const memeFile = await memeResult.json();
//     console.log(memeFile[0]);

//     const file = memeFile[0].video['1080p'];
//     const attachment = new MessageAttachment(file);
//     console.log(file);
//     await message.reply({ content: 'You said "wow"', files: [attachment] });
//   } else if (message.content.includes('sad')) {
//     if (message.author.bot) {
//       return;
//     }
//     const file = 'https://www.youtube.com/watch?v=1q6Swwvp5qk';
//     console.log(file);
//     await message.reply(`You said "sad"\n ${file}`);
//   }
// });

// Login to Discord with your client's token
client.login(process.env.TOKEN);
