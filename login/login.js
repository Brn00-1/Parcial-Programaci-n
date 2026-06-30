// login.js

document.addEventListener("DOMContentLoaded", function() {

    // ---------- REGISTRO ----------
    const formularioRegistro = document.getElementById("registroForm");
    const mensajeRegistro = document.getElementById("mensajeRegistro");

    if (formularioRegistro) {
        formularioRegistro.addEventListener("submit", function(event){
            event.preventDefault();

            const usuario = document.getElementById("registroUsername").value.trim();
            const contraseña = document.getElementById("registroPassword").value;

            // Traemos la lista de usuarios ya registrados (o un array vacío si no hay)
            const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

            // Verificamos que el usuario no exista ya
            const yaExiste = usuarios.some(u => u.usuario === usuario);

            if (yaExiste) {
                mensajeRegistro.textContent = "❌ Ese usuario ya existe";
                return;
            }

            // Guardamos el nuevo usuario en la lista
            usuarios.push({ usuario: usuario, contraseña: contraseña });
            localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));

            mensajeRegistro.textContent = "✅ Cuenta creada correctamente";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 800);
        });
    }

    // ---------- LOGIN ----------
    const formularioLogin = document.getElementById("loginForm");
    const mensajeLogin = document.getElementById("mensajeLogin");

    if (formularioLogin) {
        formularioLogin.addEventListener("submit", function(event){
            event.preventDefault();

            const usuario = document.getElementById("loginUsername").value.trim();
            const contraseña = document.getElementById("loginPassword").value;

            const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

            // Buscamos si existe un usuario con ese usuario y contraseña
            const usuarioValido = usuarios.find(
                u => u.usuario === usuario && u.contraseña === contraseña
            );

            if (!usuarioValido) {
                mensajeLogin.textContent = "❌ Usuario o contraseña incorrectos";
                return;
            }

            // Guardamos la sesión activa
            localStorage.setItem("usuarioActivo", usuario);
            localStorage.setItem("logueado", "true");

            mensajeLogin.textContent = "✅ Inicio de sesión correcto";

            setTimeout(() => {
                window.location.href = "../principal/index.html";
            }, 500);
        });
    }

});