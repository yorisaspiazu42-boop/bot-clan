const config = require("../config");

// Comprueba si el usuario tiene un rol específico
function tieneRol(member, rolID) {
    return member.roles.cache.has(rolID);
}

// Evaluador
function esEvaluador(member) {
    return tieneRol(member, config.ROLES.EVALUADOR);
}

// Moderador
function esModerador(member) {
    return tieneRol(member, config.ROLES.MODERADOR);
}

// Gestión
function esGestion(member) {
    return tieneRol(member, config.ROLES.GESTION);
}

// Administrador del bot
function esAdministrador(member) {
    return tieneRol(member, config.ROLES.ADMIN_BOT);
}

// Manager del bot
function esManager(member) {
    return tieneRol(member, config.ROLES.MANAGER_BOT);
}

// Permisos altos (Gestión, Admin o Manager)
function esStaff(member) {
    return (
        esGestion(member) ||
        esAdministrador(member) ||
        esManager(member)
    );
}

// Puede evaluar (Evaluador o superior)
function puedeEvaluar(member) {
    return (
        esEvaluador(member) ||
        esModerador(member) ||
        esGestion(member) ||
        esAdministrador(member) ||
        esManager(member)
    );
}

module.exports = {
    tieneRol,
    esEvaluador,
    esModerador,
    esGestion,
    esAdministrador,
    esManager,
    esStaff,
    puedeEvaluar
};