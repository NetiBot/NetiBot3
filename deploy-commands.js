const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// const { clientId, guildId } = require('./config.json');

const dotenv = require('dotenv');

dotenv.config();

const commands = [
  new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Responds with a random meme!'),
  new SlashCommandBuilder()
    .setName('wow')
    .setDescription('Replies with a random Own Wilson Wow!'),
  new SlashCommandBuilder()
    .setName('chuck')
    .setDescription('Replies with Chuck Norris Joke'),
  new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Replies with cat fact!'),
].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: commands }
  )
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
