import React, { useState } from 'react';
import '../../styles/iinserActu.css';

const InsertarContacto = () => {
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

    try {
      const response = await fetch('https://localhost:44357/api/Contacto/Insertar_Contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formulario)
      });

      if (response.ok) {
        setMensaje('✅ Contacto insertado correctamente');
        setFormulario({
          Id_Persona: '',
          Tipo_Contacto: '',
          Contacto: '',
          Id_Estado: ''
        });
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
      <h2>📞 Insertar Contacto</h2>
      <form onSubmit={handleSubmit}>
        {['Id_Persona', 'Tipo_Contacto', 'Contacto', 'Id_Estado'].map((campo) => (
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
        <button type="submit" className="boton-neon">Guardar</button>
      </form>
      {mensaje && <p className="mensaje-feedback">{mensaje}</p>}
    </div>
  );
};

export default InsertarContacto;