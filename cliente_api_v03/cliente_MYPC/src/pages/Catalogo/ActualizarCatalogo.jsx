import React, { useState } from 'react';
import '../../styles/iinserActu.css';

const ActualizarCatalogo = () => {
  const [id, setId] = useState('');
  const [idTipo, setIdTipo] = useState('');
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
      Id_Catalogo: parseInt(id),
      Id_Tipo_Catalogo: parseInt(idTipo),
      Nombre: nombre,
      Activo: activo
    };

    try {
      const response = await fetch('https://localhost:44357/api/CATALOGO/actualizar_catalogo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setMensaje('✅ Catálogo actualizado correctamente');
        setId('');
        setIdTipo('');
        setNombre('');
        setActivo(false);
      } else {
        const errorData = await response.json();
        setMensaje(`❌ Error: ${errorData.mensaje || 'No se pudo actualizar'}`);
      }
    } catch (error) {
      setMensaje('⚠️ Error de conexión con el servidor');
    }
  };

  return (
    <div className="formulario-galactico">
      <h2>📁 Actualizar Catálogo</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label>ID Catálogo:</label>
          <input
            type="number"
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="ID del catálogo"
            required
          />
        </div>
        <div className="campo">
          <label>ID Tipo Catálogo:</label>
          <input
            type="number"
            value={idTipo}
            onChange={e => setIdTipo(e.target.value)}
            placeholder="ID del tipo catálogo"
            required
          />
        </div>
        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Nombre del catálogo"
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

export default ActualizarCatalogo;