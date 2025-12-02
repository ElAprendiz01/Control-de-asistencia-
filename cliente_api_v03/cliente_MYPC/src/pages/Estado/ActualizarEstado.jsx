import React, { useState, useEffect } from 'react';
import '../../styles/iinserActu.css';

const ActualizarEstado = ({ estadoInicial }) => {
  const [idEstado, setIdEstado] = useState('');
  const [estado, setEstado] = useState('');
  const [activo, setActivo] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (estadoInicial) {
      setIdEstado(estadoInicial.Id_Estado);
      setEstado(estadoInicial.Estado);
      setActivo(estadoInicial.Activo);
    }
  }, [estadoInicial]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje('⚠️ No se encontró el token. Iniciá sesión nuevamente.');
      return;
    }

    const data = {
      Id_Estado: parseInt(idEstado),
      Estado: estado,
      Activo: activo
    };

    try {
      const response = await fetch('https://localhost:44357/api/ESTADOS/actualizarEstados', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const resultado = await response.json();

      if (response.ok) {
        setMensaje(`✅ ${resultado.mensaje}`);
      } else {
        setMensaje(`❌ ${resultado.mensaje || 'No se pudo actualizar'}`);
      }
    } catch (error) {
      setMensaje('⚠️ Error de conexión con el servidor');
    }
  };

  return (
    <div className="formulario-galactico">
      <h2>📁 Actualizar Estado</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label>ID del Estado:</label>
          <input
            type="number"
            value={idEstado}
            onChange={e => setIdEstado(e.target.value)}
            placeholder="ID del estado"
            required
          />
        </div>
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
        <button type="submit" className="boton-neon">Actualizar</button>
      </form>
      {mensaje && <p className="mensaje-feedback">{mensaje}</p>}
    </div>
  );
};

export default ActualizarEstado;