import React, { useState } from 'react';
import '../../styles/iinserActu.css';

const ActualizarDatosPersonales = () => {
  const [id, setId] = useState('');
  const [formulario, setFormulario] = useState({
    Primer_Nombre: '',
    Segundo_Nombre: '',
    Primer_Apellido: '',
    Segundo_Apellido: '',
    Genero: '',
    Fecha_Nacimiento: '',
    Tipo_DNI: '',
    DNI: '',
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

    const data = { Id_Persona: parseInt(id), ...formulario };

    try {
      const response = await fetch('https://localhost:44357/api/DATOS_PERSONALES/actualizar_datos_personales', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setMensaje('✅ Datos personales actualizados correctamente');
        setId('');
        setFormulario({
          Primer_Nombre: '',
          Segundo_Nombre: '',
          Primer_Apellido: '',
          Segundo_Apellido: '',
          Genero: '',
          Fecha_Nacimiento: '',
          Tipo_DNI: '',
          DNI: '',
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
      <h2>📁 Actualizar Datos Personales</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label>ID Persona:</label>
          <input
            type="number"
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="ID de la persona"
            required
          />
        </div>
        {Object.keys(formulario).map((campo) => (
          <div className="campo" key={campo}>
            <label>{campo.replace(/_/g, ' ')}:</label>
            <input
              type={campo.includes('Fecha') ? 'date' : 'text'}
              name={campo}
              value={formulario[campo]}
              onChange={handleChange}
              required={['Primer_Nombre', 'Primer_Apellido', 'Genero', 'Tipo_DNI', 'DNI', 'Id_Estado'].includes(campo)}
            />
          </div>
        ))}
        <button type="submit" className="boton-neon">Actualizar</button>
      </form>
      {mensaje && <p className="mensaje-feedback">{mensaje}</p>}
    </div>
  );
};

export default ActualizarDatosPersonales;