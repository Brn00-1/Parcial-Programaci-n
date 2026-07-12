// perfil.js
// Muestra el perfil del usuario que inició sesión en login.js
// Se basa en las claves que usa login.js:
//   - "usuariosRegistrados": array [{ usuario, contraseña }, ...]
//   - "usuarioActivo": string con el nombre de usuario logueado
//   - "logueado": "true" si hay una sesión activa

document.addEventListener("DOMContentLoaded", () => {
    const profileCard = document.getElementById("profileCard");
    const noProfileCard = document.getElementById("noProfileCard");

    const estaLogueado = localStorage.getItem("logueado") === "true";
    const usuarioActivo = localStorage.getItem("usuarioActivo");

    if (!estaLogueado || !usuarioActivo) {
        noProfileCard.style.display = "block";
        return;
    }

    // Buscamos los datos del usuario dentro de la lista de registrados
    const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
    const usuario = usuarios.find(u => u.usuario === usuarioActivo);

    if (!usuario) {
        // Por las dudas: hay sesión activa pero no se encuentra en la lista
        noProfileCard.style.display = "block";
        return;
    }

    document.getElementById("profileUsername").textContent = usuario.usuario;

    profileCard.style.display = "block";

    // Cerrar sesión
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo");
        localStorage.removeItem("logueado");
        window.location.href = "index.html";
    });
});