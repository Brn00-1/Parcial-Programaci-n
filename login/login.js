const formulario = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", function(event){

    event.preventDefault();

    const usuario = document.getElementById("username").value;
    const contraseña = document.getElementById("password").value;

    if (usuario === "johnd" && contraseña === "m38rmF%bodylt") {

        mensaje.textContent = "✅ Inicio de sesión correcto";

        // Ir a la página principal
        window.location.href = ".../principal/index.html";

    } else {

        mensaje.textContent = "❌ Usuario o contraseña incorrectos";

    }

});