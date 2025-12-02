// src/services/AuthService.js
import jwtDecode from "jwt-decode";

export async function login(usuario, contrasena) {
  const response = await fetch("api/Acceso/Iniciar sesión", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, contrasena })
  });

  const data = await response.json();

  if (data.isSuccess) {
    const decoded = jwtDecode(data.token);
    const idPersona = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

    // Guardamos token e ID en localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", idPersona);

    return { ok: true, mensaje: "Login exitoso." };
  } else {
    return { ok: false, mensaje: data.mensaje };
  }
}
