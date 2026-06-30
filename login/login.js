// login.js

document.addEventListener("DOMContentLoaded", function() {

    // ---------- LOGIN ----------
    const formularioLogin = document.getElementById("loginForm");
    const mensajeLogin = document.getElementById("mensajeLogin");

    if (formularioLogin) {
        formularioLogin.addEventListener("submit", async function(event){
            event.preventDefault();

            const usuario = document.getElementById("loginUsername").value;
            const contraseña = document.getElementById("loginPassword").value;

            try {
                const response = await fetch("https://fakestoreapi.com/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: usuario, password: contraseña })
                });

                if (!response.ok) {
                    mensajeLogin.textContent = "❌ Usuario o contraseña incorrectos";
                    return;
                }

                const data = await response.json();
                console.log("Respuesta login:", data);

                localStorage.setItem("token", data.token);
                localStorage.setItem("usuario", usuario);
                localStorage.setItem("logueado", "true");

                mensajeLogin.textContent = "✅ Inicio de sesión correcto";
                window.location.href = "../principal/index.html";

            } catch (error) {
                console.error("Error login:", error);
                mensajeLogin.textContent = "⚠️ Error de conexión";
            }
        });
    }

    // ---------- REGISTRO ----------
    const formularioRegistro = document.getElementById("registroForm");
    const mensajeRegistro = document.getElementById("mensajeRegistro");

    if (formularioRegistro) {
        formularioRegistro.addEventListener("submit", async function(event){
            event.preventDefault();

            const usuario = document.getElementById("registroUsername").value;
            const contraseña = document.getElementById("registroPassword").value;

            try {
                const response = await fetch("https://fakestoreapi.com/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: usuario, password: contraseña })
                });

                if (!response.ok) {
                    mensajeRegistro.textContent = "❌ No se pudo crear la cuenta";
                    return;
                }

                const data = await response.json();
                console.log("Respuesta registro:", data);

                localStorage.setItem("usuario", usuario);
                localStorage.setItem("logueado", "true");

                mensajeRegistro.textContent = "✅ Cuenta creada correctamente";
                window.location.href = "../principal/index.html";

            } catch (error) {
                console.error("Error registro:", error);
                mensajeRegistro.textContent = "⚠️ Error de conexión";
            }
        });
    }

});