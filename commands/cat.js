const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Replies with cat fact!'),
  async execute(interaction) {
    const memeResult = await fetch('https://meowfacts.herokuapp.com');
    const memeFile = await memeResult.json();
    const file = memeFile.data;
    await interaction.reply(`${file}`);
  },
};
