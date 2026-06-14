const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('aceptar')
    .setDescription('Aceptar al usuario evaluado y darle el rol ★★★')
    .addUserOption(option =>
      option
        .setName('usuario')
        .setDescription('Usuario a aceptar')
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

      const member = await interaction.guild.members.fetch(usuario.id);

      const rolIntegrante = interaction.guild.roles.cache.find(
        r => r.name === "★★★"
      );

      if (!rolIntegrante) {
        return interaction.editReply({
          content: "❌ No se encontró el rol ★★★."
        });
      }

      // Asignar el rol
      await member.roles.add(rolIntegrante);

      // Mensaje en el canal de evaluación
      await interaction.channel.send(
        `🎉 ¡Felicidades ${usuario}! Has aprobado la evaluación.\n\nBienvenido oficialmente al clan. Desde este momento recibes el rango **★★★**. ¡Esperamos que disfrutes tu estancia y sigas creciendo con nosotros! 🎉`
      );

      await interaction.editReply({
        content: "✅ Usuario aceptado correctamente."
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
        content: "❌ Ocurrió un error al aceptar al usuario."
      });
    }
  },
};