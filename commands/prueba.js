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

        const nombreCanal =
            "evaluacion-" +
            usuario.user.username
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "-");
                        // Verificar si ya existe un canal para este usuario
        const canalExistente = interaction.guild.channels.cache.find(
            c =>
                c.parentId === config.CANALES.CATEGORIA_PRUEBAS &&
                c.topic === usuario.id
        );

        if (canalExistente) {

            return interaction.editReply({
                content: `❌ ${usuario} ya tiene una evaluación abierta: ${canalExistente}`
            });

        }

        const canal = await interaction.guild.channels.create({

            name: nombreCanal,

            type: ChannelType.GuildText,

            parent: config.CANALES.CATEGORIA_PRUEBAS,

            topic: usuario.id,

            permissionOverwrites: [

                {
                    id: interaction.guild.roles.everyone,
                    deny: [PermissionsBitField.Flags.ViewChannel]
                },

                {
                    id: usuario.id,
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory
                    ]
                },

                {
                    id: config.ROLES.EVALUADOR,
                                       allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory
                    ]
                }

            ]

        });

        await canal.setTopic(usuario.id);

        const botones = new ActionRowBuilder().addComponents(

            new ButtonBuilder()
                .setCustomId("aprobar")
                .setLabel("Aprobar")
                .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
                .setCustomId("rechazar")
                .setLabel("Rechazar")
                .setStyle(ButtonStyle.Danger)

        );

        await canal.send({
            embeds: [
                embeds.canalPrueba(
                    usuario.user,
                    interaction.user
                )
            ],
            components: [botones]
        });

        await interaction.editReply({
            content: `✅ Canal de evaluación creado: ${canal}`
        });

    }

};