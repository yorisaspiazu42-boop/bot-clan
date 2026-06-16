const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");

module.exports = {

    customId: "solicitar",

    async execute(interaction) {

        const modal = new ModalBuilder()
            .setCustomId("modalSolicitud")
            .setTitle("Solicitud de ingreso");

        const idJugador = new TextInputBuilder()
            .setCustomId("idJugador")
            .setLabel("ID del jugador")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const rango = new TextInputBuilder()
            .setCustomId("rangoJugador")
            .setLabel("Rango actual")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const modo = new TextInputBuilder()
            .setCustomId("modoJuego")
            .setLabel("Modo de juego")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        modal.addComponents(
            new ActionRowBuilder().addComponents(idJugador),
            new ActionRowBuilder().addComponents(rango),
            new ActionRowBuilder().addComponents(modo)
        );

        await interaction.showModal(modal);

    }

};