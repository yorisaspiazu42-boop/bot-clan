const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const config = require("../config");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("panel")
        .setDescription("Publica el panel de solicitudes.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        const botones = new ActionRowBuilder().addComponents(

            new ButtonBuilder()
                .setCustomId("solicitar")
                .setLabel("📝 Solicitar ingreso")
                .setStyle(ButtonStyle.Primary)

        );

        await interaction.reply({

            embeds: [

                {
                    color: config.COLORES.AZUL,
                    title: "📥 Solicitudes para el Clan",
                    description:
                        "Bienvenido.\n\n" +
                        "Si deseas ingresar al clan, pulsa el botón **📝 Solicitar ingreso** y completa el formulario.\n\n" +
                        "Un evaluador revisará tu solicitud y, si es aceptada, se abrirá un canal privado para realizar la prueba."
                }

            ],

            components: [botones]

        });

    }

};