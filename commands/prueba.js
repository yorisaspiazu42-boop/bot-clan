const crearCanalPrueba = require("../utils/crearCanalPrueba");
const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChannelType,
    PermissionsBitField,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const config = require("../config");
const embeds = require("../utils/embeds");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("prueba")
        .setDescription("Crear un canal de evaluación.")
        .addUserOption(option =>
            option
                .setName("usuario")
                .setDescription("Jugador a evaluar")
                .setRequired(true)
        ),

    async execute(interaction) {

        const miembro = interaction.member;

        const puedeEvaluar =

            miembro.roles.cache.has(config.ROLES.EVALUADOR) ||
            miembro.roles.cache.has(config.ROLES.MODERADOR) ||
            miembro.roles.cache.has(config.ROLES.GESTION) ||
            miembro.roles.cache.has(config.ROLES.ADMIN_BOT) ||
            miembro.roles.cache.has(config.ROLES.MANAGER_BOT);

        if (!puedeEvaluar) {

            return interaction.reply({

                content: "❌ No tienes permisos.",

                ephemeral: true

            });

        }

        await interaction.deferReply({

            ephemeral: true

        });

        const usuario = interaction.options.getMember("usuario");

        if (!usuario) {

            return interaction.editReply({

                content: "❌ Usuario no encontrado."

            });

        }

        const resultado = await crearCanalPrueba(
    interaction.guild,
    usuario,
    interaction.user
);

if (!resultado.ok) {

    return interaction.editReply({

        content: resultado.mensaje

    });

}

await interaction.editReply({

    content: `✅ Canal de evaluación creado: ${resultado.canal}`

});

    }

};