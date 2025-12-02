import React, { useState } from 'react';
import '../../styles/iinserActu.css';

const InsertarEstado = () => {
  const [estado, setEstado] = useState('');
  const [activo, setActivo] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje('⚠️ No se encontró el token. Iniciá sesión nuevamente.');
      return;
    }

    const data = {
      Estado: estado,
      Activo: activo
    };

    try {
      const response = await fetch('https://localhost:44357/api/ESTADOS/insertarEstados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setMensaje('✅ Estado insertado correctamente');
        setEstado('');
        setActivo(false);
      } else {
        const errorData = await response.json();
        setMensaje(`❌ Error: ${errorData.mensaje || 'No se pudo insertar'}`);
      }
    } catch (error) {
      setMensaje('⚠️ Error de conexión con el servidor');
    }
  };

  return (
    <div className="formulario-galactico">
      <h2>🟢 Insertar Estado</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label>Estado:</label>
          <input
            type="text"
            value={estado}
            onChange={e => setEstado(e.target.value)}
            placeholder="Nombre del estado"
            required
          />
        </div>
        <div className="campo">
          <label>Activo:</label>
          <input
            type="checkbox"
            checked={activo}
            onChange={e => setActivo(e.target.checked)}
          />
        </div>
        <button type="submit" className="boton-neon">Guardar</button>
      </form>
      {mensaje && <p className="mensaje-feedback">{mensaje}</p>}
    </div>
  );
};

export default InsertarEstado;