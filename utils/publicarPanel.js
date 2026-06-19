const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require("discord.js");

const config = require("../config");

module.exports = async (client) => {

    const canal = client.channels.cache.get(config.CANALES.SOLICITUDES);

    if (!canal) {
        console.log("❌ No se encontró el canal de solicitudes.");
        return;
    }

    // Buscar si ya existe un panel enviado por el bot
    const mensajes = await canal.messages.fetch({ limit: 20 });

    const existe = mensajes.find(msg =>
        msg.author.id === client.user.id &&
        msg.components.length > 0
    );

    if (existe) {

        console.log("✅ El panel ya existe.");

        return;

    }

    const embed = new EmbedBuilder()

        .setColor(config.COLORES.AZUL)

        .setTitle("📥 Solicitudes para el Clan")

        .setDescription(
            "Pulsa el botón de abajo para enviar tu solicitud de ingreso al clan.\n\n" +
            "Un evaluador revisará tu solicitud y, si es aceptada, realizará tu prueba."
        );

    const botones = new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()

                .setCustomId("solicitar")

                .setLabel("📝 Solicitar ingreso")

                .setStyle(ButtonStyle.Primary)

        );

    await canal.send({

        embeds: [embed],

        components: [botones]

    });

    console.log("✅ Panel publicado.");

};