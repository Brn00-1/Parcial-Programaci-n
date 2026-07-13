// login usuario y contraseña
document.addEventListener("DOMContentLoaded", function() {

    const formularioRegistro = document.getElementById("registroForm");
    const mensajeRegistro = document.getElementById("mensajeRegistro");

    if (formularioRegistro) {
        formularioRegistro.addEventListener("submit", function(event){
            event.preventDefault();

            const nombre = document.getElementById("registroNombre").value.trim();
            const apellido = document.getElementById("registroApellido").value.trim();
            const email = document.getElementById("registroEmail").value.trim();
            const usuario = document.getElementById("registroUsername").value.trim();
            const contraseña = document.getElementById("registroPassword").value;

            const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

            const yaExiste = usuarios.some(u => u.usuario === usuario);

            if (yaExiste) {
                mensajeRegistro.textContent = " Ese usuario ya existe";
                return;
            }

            usuarios.push({
                nombre: nombre,
                apellido: apellido,
                email: email,
                usuario: usuario,
                contraseña: contraseña
            });
            localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));

            mensajeRegistro.textContent = " Cuenta creada correctamente";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 800);
        });
    }

    const formularioLogin = document.getElementById("loginForm");
    const mensajeLogin = document.getElementById("mensajeLogin");

    if (formularioLogin) {
        formularioLogin.addEventListener("submit", function(event){
            event.preventDefault();

            const usuario = document.getElementById("loginUsername").value.trim();
            const contraseña = document.getElementById("loginPassword").value;

            const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

            const usuarioValido = usuarios.find(
                u => u.usuario === usuario && u.contraseña === contraseña
            );

            if (!usuarioValido) {
                mensajeLogin.textContent = " Usuario o contraseña incorrectos";
                return;
            }

            localStorage.setItem("usuarioActivo", usuario);
            localStorage.setItem("logueado", "true");

            mensajeLogin.textContent = " Inicio de sesión correcto";

            setTimeout(() => {
                window.location.href = "../principal/index.html";
            }, 500);
        });
    }

});