const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rechazar')
    .setDescription('Rechazar al usuario evaluado')
    .addUserOption(option =>
      option
        .setName('usuario')
        .setDescription('Usuario a rechazar')
        .setRequired(true)
    ),

  async execute(interaction) {

    // Solo el rol ★★★★★ puede usar este comando
    if (!interaction.member.roles.cache.some(r => r.name === "★★★★★")) {
      return interaction.reply({
        content: "❌ No tienes permiso para usar este comando.",
        ephemeral: true,
      });
    }

    await interaction.deferReply({ ephemeral: true });

    const usuario = interaction.options.getUser('usuario');

    try {

      // Mensaje de motivación
      await interaction.channel.send(
        `💙 ${usuario}, gracias por participar en la evaluación.

En esta ocasión no has logrado aprobar, pero eso no significa que no puedas conseguirlo. Sigue practicando, mejora tus habilidades y vuelve a intentarlo cuando te sientas preparado.

¡Te esperamos nuevamente y mucho éxito! 💪🔥`
      );

      await interaction.editReply({
        content: "✅ Se envió el mensaje de motivación. El canal se eliminará en 1 minuto."
      });

      // Eliminar el canal después de 1 minuto
      setTimeout(async () => {
        try {
          await interaction.channel.delete();
        } catch (err) {
          console.error(err);
        }
      }, 60000);

    } catch (error) {
      console.error(error);

      await interaction.editReply({
        content: "❌ Ocurrió un error al rechazar al usuario."
      });
    }
  },
};