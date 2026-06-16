const {
    ChannelType,
    PermissionsBitField,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const config = require("../config");
const embeds = require("./embeds");

async function crearCanalPrueba(guild, usuario, evaluador) {

    const nombreCanal =
        "evaluacion-" +
        usuario.user.username
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "-");

    // Verificar si ya existe una evaluación
    const canalExistente = guild.channels.cache.find(
        c =>
            c.parentId === config.CANALES.CATEGORIA_PRUEBAS &&
            c.topic === usuario.id
    );

    if (canalExistente) {
        return {
            ok: false,
            mensaje: `❌ ${usuario} ya tiene una evaluación abierta: ${canalExistente}`
        };
    }

    const canal = await guild.channels.create({

        name: nombreCanal,

        type: ChannelType.GuildText,

        parent: config.CANALES.CATEGORIA_PRUEBAS,

        topic: usuario.id,

        permissionOverwrites: [

            {
                id: guild.roles.everyone,
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
                evaluador.user
            )

        ],

        components: [botones]

    });

    return {
        ok: true,
        canal
    };

}

module.exports = crearCanalPrueba;