import React, { useState } from 'react';
import '../../styles/iinserActu.css';

const InsertarDatosPersonales = () => {
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

    try {
      const response = await fetch('https://localhost:44357/api/DATOS_PERSONALES/insertar_datos_personales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formulario)
      });

      if (response.ok) {
        setMensaje('✅ Datos personales insertados correctamente');
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
        setMensaje(`❌ Error: ${errorData.mensaje || 'No se pudo insertar'}`);
      }
    } catch (error) {
      setMensaje('⚠️ Error de conexión con el servidor');
    }
  };

  return (
    <div className="formulario-galactico">
      <h2>🟢 Insertar Datos Personales</h2>
      <form onSubmit={handleSubmit}>
        {['Primer_Nombre', 'Segundo_Nombre', 'Primer_Apellido', 'Segundo_Apellido', 'Genero', 'Fecha_Nacimiento', 'Tipo_DNI', 'DNI', 'Id_Estado'].map((campo) => (
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
        <button type="submit" className="boton-neon">Guardar</button>
      </form>
      {mensaje && <p className="mensaje-feedback">{mensaje}</p>}
    </div>
  );
};

export default InsertarDatosPersonales;