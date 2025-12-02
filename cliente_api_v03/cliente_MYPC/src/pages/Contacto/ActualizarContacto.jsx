import React, { useState } from 'react';
import '../../styles/iinserActu.css';

const ActualizarContacto = () => {
  const [id, setId] = useState('');
  const [formulario, setFormulario] = useState({
    Id_Persona: '',
    Tipo_Contacto: '',
    Contacto: '',
    Id_Estado: ''
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje('⚠️ No se encontró el token. Iniciá sesión nuevamente.');
      return;
    }

    const data = { Id_Contacto: parseInt(id), ...formulario };

    try {
      const response = await fetch('https://localhost:44357/api/Contacto/Actualizar_Contacto', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setMensaje('✅ Contacto actualizado correctamente');
        setId('');
        setFormulario({
          Id_Persona: '',
          Tipo_Contacto: '',
          Contacto: '',
          Id_Estado: ''
        });
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
      <h2>✏️ Actualizar Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label>ID Contacto:</label>
          <input
            type="number"
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="ID del contacto"
            required
          />
        </div>
        {Object.keys(formulario).map((campo) => (
          <div className="campo" key={campo}>
            <label>{campo.replace(/_/g, ' ')}:</label>
            <input
              type="text"
              name={campo}
              value={formulario[campo]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="boton-neon">Actualizar</button>
      </form>
      {mensaje && <p className="mensaje-feedback">{mensaje}</p>}
    </div>
  );
};

export default ActualizarContacto;