import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registro() {
  const [idPersona, setIdPersona] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validarFormulario = () => {
    const idNum = parseInt(idPersona);
    if (isNaN(idNum) || idNum <= 0) {
      setMensaje("⚠️ El ID Persona debe ser un número entero positivo.");
      return false;
    }
    if (usuario.trim().length < 3 || usuario.length > 40) {
      setMensaje("⚠️ El usuario debe tener entre 3 y 40 caracteres.");
      return false;
    }
    if (contrasena.length < 6 || contrasena.length > 20) {
      setMensaje("⚠️ La contraseña debe tener entre 6 y 20 caracteres.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    setLoading(true);
    setMensaje("");

    try {
      const res = await fetch("https://localhost:44325/api/Access/Registrarse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_Persona: parseInt(idPersona),
          usuario,
          contrasena,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.mensaje || `Error ${res.status}`);
      }

      const data = await res.json();
      console.log("Respuesta del backend:", data);

      if (data.resultado === 0) {
        setMensaje("✅ " + data.mensaje);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMensaje("⚠️ " + (data.mensaje || "Error al registrar usuario"));
      }
    } catch (err) {
      setMensaje("❌ Error al conectar con el servidor: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", marginTop: 50 }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="number"
          placeholder="ID Persona"
          value={idPersona}
          onChange={(e) => setIdPersona(e.target.value)}
          required
          className="form-control mb-2"
          min="1"
        />
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
          className="form-control mb-2"
          minLength={3}
          maxLength={40}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
          className="form-control mb-2"
          minLength={6}
          maxLength={20}
        />
        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
      {mensaje && <p className="mt-2">{mensaje}</p>}
    </div>
  );
}

export default Registro;
