import React, { useState } from 'react';
import '../../styles/iinserActu.css';

const ActualizarContrato = () => {
  const [id, setId] = useState('');
  const [idPersona, setIdPersona] = useState('');
  const [descripcion, setDescripcion] = useState('');
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
      Id_Contrato: parseInt(id),
      Id_Persona: parseInt(idPersona),
      Descripcion: descripcion,
      Activo: activo
    };

    try {
      const response = await fetch('https://localhost:44357/api/CONTRATO/actualizar_contrato', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setMensaje('✅ Contrato actualizado correctamente');
        setId('');
        setIdPersona('');
        setDescripcion('');
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
      <h2>📄 Actualizar Contrato</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label>ID Contrato:</label>
          <input type="number" value={id} onChange={e => setId(e.target.value)} required />
        </div>
        <div className="campo">
          <label>ID Persona:</label>
          <input type="number" value={idPersona} onChange={e => setIdPersona(e.target.value)} required />
        </div>
        <div className="campo">
          <label>Descripción:</label>
          <input type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
        </div>
        <div className="campo">
          <label>Activo:</label>
          <input type="checkbox" checked={activo} onChange={e => setActivo(e.target.checked)} />
        </div>
        <button type="submit" className="boton-neon">Actualizar</button>
      </form>
      {mensaje && <p className="mensaje-feedback">{mensaje}</p>}
    </div>
  );
};

export default ActualizarContrato;