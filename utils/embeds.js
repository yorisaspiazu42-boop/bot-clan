const { EmbedBuilder } = require("discord.js");
const config = require("../config");

function aprobado(usuario, evaluador) {
    return new EmbedBuilder()
        .setColor(config.COLORES.VERDE)
        .setTitle("✅ Evaluación Aprobada")
        .setDescription(
            `**Jugador:** ${usuario}\n` +
            `**Evaluador:** ${evaluador}\n\n` +
            `🎉 ¡Felicidades! Has sido aceptado oficialmente en el clan.`
        )
        .setFooter({
            text: `${config.BOT.NOMBRE} • Versión ${config.BOT.VERSION}`
        })
        .setTimestamp();
}

function rechazado(usuario, evaluador) {
    return new EmbedBuilder()
        .setColor(config.COLORES.ROJO)
        .setTitle("❌ Evaluación No Aprobada")
        .setDescription(
            `**Jugador:** ${usuario}\n` +
            `**Evaluador:** ${evaluador}\n\n` +
            `💪 No te rindas. Sigue practicando y vuelve a intentarlo cuando estés preparado.`
        )
        .setFooter({
            text: `${config.BOT.NOMBRE} • Versión ${config.BOT.VERSION}`
        })
        .setTimestamp();
}

function nuevaSolicitud(usuario, idJugador, rango, modo) {
    return new EmbedBuilder()
        .setColor(config.COLORES.AZUL)
        .setTitle("📥 Nueva Solicitud")
        .addFields(
            { name: "👤 Usuario", value: `${usuario}`, inline: false },
            { name: "🆔 ID", value: idJugador, inline: true },
            { name: "🏅 Rango", value: rango, inline: true },
            { name: "🎮 Modo", value: modo, inline: true }
        )
        .setFooter({
            text: `${config.BOT.NOMBRE} • Versión ${config.BOT.VERSION}`
        })
        .setTimestamp();
}

function canalPrueba(usuario, evaluador) {
    return new EmbedBuilder()
        .setColor(config.COLORES.AMARILLO)
        .setTitle("📝 Evaluación")
        .setDescription(
            `**Jugador:** ${usuario}\n` +
            `**Evaluador:** ${evaluador}\n\n` +
            `Selecciona una acción utilizando los botones de abajo.`
        )
        .setFooter({
            text: `${config.BOT.NOMBRE} • Versión ${config.BOT.VERSION}`
        })
        .setTimestamp();
}

module.exports = {
    aprobado,
    rechazado,
    nuevaSolicitud,
    canalPrueba
};