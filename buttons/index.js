const fs = require("fs");
const path = require("path");

module.exports = (client) => {

    client.buttons = new Map();

    const buttonsPath = __dirname;

    const buttonFiles = fs.readdirSync(buttonsPath)
        .filter(file => file.endsWith(".js") && file !== "index.js");

    for (const file of buttonFiles) {

        const button = require(path.join(buttonsPath, file));

        client.buttons.set(button.customId, button);

        console.log(`🔘 Botón cargado: ${button.customId}`);

    }

};