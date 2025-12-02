import React, { useState } from 'react';
import '../../styles/filtros.css';

const FiltrarContactoPorPersona = () => {
  const [idPersona, setIdPersona] = useState('');
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState('');

  const buscarPorPersona = async () => {
    if (!idPersona.trim()) {
      setError('⚠️ Ingrese un ID válido.');
      setResultados([]);
      return;
    }

    try {
      const res = await fetch(`https://localhost:44357/api/Contacto/Filtrar_contacto?id_persona=${idPersona}`);
      const data = await res.json();
      setResultados(data);
      setError('');
    } catch (err) {
      setResultados([]);
      setError('❌ No se encontraron resultados o hubo un error en la petición.');
    }
  };

  return (
    <div className="estado-container">
      <h2>🔍 Filtrar Contactos por Persona</h2>
      <div className="input-group">
        <input
          type="number"
          value={idPersona}
          onChange={(e) => setIdPersona(e.target.value)}
          placeholder="Ingrese ID de persona"
        />
        <button onClick={buscarPorPersona}>Buscar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {resultados.length > 0 && (
        <table className="estado-table fade-in">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Contacto</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((c, index) => (
              <tr key={index}>
                <td>{c.id_Contacto}</td>
                <td>{c.tipo_Contacto}</td>
                <td>{c.contacto}</td>
                <td>{c.id_Estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FiltrarContactoPorPersona;