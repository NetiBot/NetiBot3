const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chuck')
    .setDescription('Replies with chuck norris joke!'),
  async execute(interaction) {
    const memeResult = await fetch('https://api.chucknorris.io/jokes/random');
    const memeFile = await memeResult.json();
    const file = memeFile.value;
    await interaction.reply(`${file}`);
  },
};
