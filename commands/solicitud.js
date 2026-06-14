const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('solicitud')
    .setDescription('Enviar una solicitud para ingresar al clan'),

  async execute(interaction) {

    const modal = new ModalBuilder()
      .setCustomId('modalSolicitud')
      .setTitle('Solicitud de ingreso');

    const idJugador = new TextInputBuilder()
      .setCustomId('idJugador')
      .setLabel('ID del jugador')
      .setPlaceholder('Ejemplo: 123456789')
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setMaxLength(30);

    const rangoJugador = new TextInputBuilder()
      .setCustomId('rangoJugador')
      .setLabel('Rango actual')
      .setPlaceholder('Ejemplo: Corona, As, etc.')
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setMaxLength(30);

    const modoJuego = new TextInputBuilder()
      .setCustomId('modoJuego')
      .setLabel('Modo de juego')
      .setPlaceholder('BR, CS, Duelo de Escuadras...')
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setMaxLength(40);

    modal.addComponents(
      new ActionRowBuilder().addComponents(idJugador),
      new ActionRowBuilder().addComponents(rangoJugador),
      new ActionRowBuilder().addComponents(modoJuego)
    );

    await interaction.showModal(modal);

  },
};