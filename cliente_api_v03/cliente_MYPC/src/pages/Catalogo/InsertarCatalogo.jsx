import React, { useState } from 'react';
import '../../styles/iinserActu.css';
const InsertarCatalogo = () => {
  const [formulario, setFormulario] = useState({
    id_Tipo_Catalogo: '',
    nombre: '',
    activo: true
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario({
      ...formulario,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje('⚠️ Token no encontrado. Iniciá sesión.');
      return;
    }

    try {
      const response = await fetch('https://localhost:44357/api/CATALOGO/insertar_catalogo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formulario)
      });

      const data = await response.json();
      setMensaje(data.mensaje || '✅ Catálogo insertado correctamente');
    } catch (error) {
      setMensaje('❌ Error al insertar catálogo');
    }
  };

  return (
    <div className="formulario-galactico">
      <h2>Insertar Catálogo</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label>ID Tipo Catálogo:</label>
          <input
            type="number"
            name="id_Tipo_Catalogo"
            value={formulario.id_Tipo_Catalogo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
            maxLength={80}
            required
          />
        </div>

        <div className="campo-check">
          <label>Activo:</label>
          <input
            type="checkbox"
            name="activo"
            checked={formulario.activo}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="boton-enviar">🚀 Insertar</button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default InsertarCatalogo;