import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/filtros.css';

const ContratoPorPersona = () => {
  const [idPersona, setIdPersona] = useState('');
  const [contratos, setContratos] = useState([]);
  const [error, setError] = useState('');

  const buscarContratos = async () => {
    if (!idPersona.trim()) {
      setError('⚠️ Ingrese un ID de persona válido.');
      setContratos([]);
      return;
    }

    try {
      const res = await axios.get(`https://localhost:44357/api/CONTRATO/buscar_contrato_por_persona?idPersona=${idPersona}`);
      setContratos(res.data);
      setError('');
    } catch (err) {
      setContratos([]);
      setError('❌ No se encontraron contratos o hubo un error en la petición.');
    }
  };

  return (
    <div className="estado-container">
      <h2>👤 Buscar Contratos por Persona</h2>
      <div className="input-group">
        <input
          type="number"
          value={idPersona}
          onChange={(e) => setIdPersona(e.target.value)}
          placeholder="Ingrese ID de persona"
        />
        <button onClick={buscarContratos}>Buscar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {contratos.length > 0 && (
        <table className="estado-table fade-in">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Fecha Creación</th>
              <th>Fecha Modificación</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody>
            {contratos.map((c) => (
              <tr key={c.id_Contrato}>
                <td>{c.id_Contrato}</td>
                <td>{c.descripcion}</td>
                <td>{new Date(c.fecha_Creacion).toLocaleString()}</td>
                <td>{new Date(c.fecha_Modificacion).toLocaleString()}</td>
                <td>{c.activo ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContratoPorPersona;