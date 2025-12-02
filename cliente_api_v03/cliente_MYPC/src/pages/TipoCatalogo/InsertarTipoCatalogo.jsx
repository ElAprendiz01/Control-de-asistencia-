import React, { useState } from 'react';
import '../../styles/iinserActu.css';

const InsertarTipoCatalogo = () => {
  const [nombre, setNombre] = useState('');
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
      Nombre: nombre,
      Activo: activo
    };

    try {
      const response = await fetch('https://localhost:44357/api/TIPO_CATALOGO/Insertar_tipo_catalogo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setMensaje('✅ Tipo catálogo insertado correctamente');
        setNombre('');
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
      <h2>🟢 Insertar Tipo Catálogo</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Nombre del tipo catálogo"
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

export default InsertarTipoCatalogo;