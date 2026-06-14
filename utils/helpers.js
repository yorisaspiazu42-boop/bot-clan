module.exports = {

    async obtenerMiembro(guild, id) {

        try {

            return await guild.members.fetch(id);

        } catch {

            return null;

        }

    },

    async agregarRol(miembro, rolId) {

        return await miembro.roles.add(rolId);

    },

    async eliminarCanal(canal) {

        setTimeout(async () => {

            try {

                await canal.delete();

            } catch (error) {

                console.error(error);

            }

        }, 60000);

    }

};