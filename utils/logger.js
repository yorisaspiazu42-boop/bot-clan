const fs = require("fs");
const path = require("path");

const carpetaLogs = path.join(__dirname, "..", "logs");

if (!fs.existsSync(carpetaLogs)) {
    fs.mkdirSync(carpetaLogs);
}

function escribir(tipo, mensaje) {

    const fecha = new Date();

    const archivo = path.join(
        carpetaLogs,
        `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}-${String(fecha.getDate()).padStart(2, "0")}.log`
    );

    const hora =
        `[${String(fecha.getHours()).padStart(2, "0")}:${String(fecha.getMinutes()).padStart(2, "0")}:${String(fecha.getSeconds()).padStart(2, "0")}]`;

    const linea = `${hora} [${tipo}] ${mensaje}\n`;

    fs.appendFileSync(archivo, linea);
}

function info(mensaje) {
    console.log("ℹ️ " + mensaje);
    escribir("INFO", mensaje);
}

function success(mensaje) {
    console.log("✅ " + mensaje);
    escribir("SUCCESS", mensaje);
}

function warning(mensaje) {
    console.log("⚠️ " + mensaje);
    escribir("WARNING", mensaje);
}

function error(mensaje) {
    console.log("❌ " + mensaje);
    escribir("ERROR", mensaje);
}

module.exports = {
    info,
    success,
    warning,
    error
};