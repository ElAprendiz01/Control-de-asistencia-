import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/filtros.css';

const DatosPersonalesPorId = () => {
  const [id, setId] = useState('');
  const [persona, setPersona] = useState(null);
  const [error, setError] = useState('');

  const buscarPersona = async () => {
    if (!id.trim()) {
      setError('⚠️ Ingrese un ID válido.');
      setPersona(null);
      return;
    }

    try {
      const res = await axios.get(`https://localhost:44357/api/DATOS_PERSONALES/Buscar_datos_personales_por_id?id=${id}`);
      setPersona(res.data[0]);
      setError('');
    } catch (err) {
      setPersona(null);
      setError('❌ No se encontró la persona o hubo un error en la petición.');
    }
  };

  return (
    <div className="estado-container">
      <h2>🔍 Buscar Datos Personales por ID</h2>
      <div className="input-group">
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Ingrese ID"
        />
        <button onClick={buscarPersona}>Buscar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {persona && (
        <table className="estado-table fade-in">
          <tbody>
            <tr><th>ID</th><td>{persona.id_Persona}</td></tr>
            <tr><th>Nombre</th><td>{`${persona.primer_Nombre} ${persona.segundo_Nombre || ''}`}</td></tr>
            <tr><th>Apellidos</th><td>{`${persona.primer_Apellido} ${persona.segundo_Apellido || ''}`}</td></tr>
            <tr><th>Género</th><td>{persona.genero}</td></tr>
            <tr><th>Fecha Nacimiento</th><td>{new Date(persona.fecha_Nacimiento).toLocaleDateString()}</td></tr>
            <tr><th>Tipo DNI</th><td>{persona.tipo_DNI}</td></tr>
            <tr><th>DNI</th><td>{persona.dni}</td></tr>
            <tr><th>Estado</th><td>{persona.id_Estado}</td></tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DatosPersonalesPorId;