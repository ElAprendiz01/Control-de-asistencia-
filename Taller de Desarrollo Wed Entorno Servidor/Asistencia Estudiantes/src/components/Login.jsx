import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:44325/api/Access/Login", {
        Usuario: usuario,
        Contrasena: contrasena,
      });

      const resultado = response.data.result?.resultado;
      const mensaje = response.data.result?.mensaje;
      const token = response.data.tokenAccess?.token;

      if (resultado === 1) {
        if (!token || token.length < 50) {
          alert("Token inválido o no recibido. Contacta soporte.");
          return;
        }

        localStorage.setItem("usuario", usuario);
        localStorage.setItem("access_token", token);
        navigate("/home");
      } else {
        alert("Credenciales incorrectas: " + mensaje);
      }
    } catch (error) {
      if (error.response) {
        const mensajeError = error.response.data?.mensaje || "Error en la respuesta del servidor.";
        console.error("Error respuesta backend:", error.response.data);
        alert("Error: " + mensajeError);
      } else {
        console.error("Error en el inicio de sesión:", error);
        alert("Error al intentar iniciar sesión.");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Inicio Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
