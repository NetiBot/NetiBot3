const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wow')
    .setDescription('Replies with owen wilsons wow!'),
  async execute(interaction) {
    const memeResult = await fetch(
      'https://owen-wilson-wow-api.herokuapp.com/wows/random'
    );
    const memeFile = await memeResult.json();
    const file = memeFile[0].video['1080p'];
    await interaction.reply({
      files: [{ attachment: file }],
    });
  },
};
