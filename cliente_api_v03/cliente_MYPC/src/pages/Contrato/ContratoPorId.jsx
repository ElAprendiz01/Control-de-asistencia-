import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/filtros.css';

const ContratoPorId = () => {
  const [id, setId] = useState('');
  const [contrato, setContrato] = useState(null);
  const [error, setError] = useState('');

  const buscarContrato = async () => {
    if (!id.trim()) {
      setError('⚠️ Ingrese un ID válido.');
      setContrato(null);
      return;
    }

    try {
      const res = await axios.get(`https://localhost:44357/api/CONTRATO/buscar_contrato_por_id?id=${id}`);
      setContrato(res.data[0]);
      setError('');
    } catch (err) {
      setContrato(null);
      setError('❌ No se encontró el contrato o hubo un error en la petición.');
    }
  };

  return (
    <div className="estado-container">
      <h2>🔍 Buscar Contrato por ID</h2>
      <div className="input-group">
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Ingrese ID"
        />
        <button onClick={buscarContrato}>Buscar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {contrato && (
        <table className="estado-table fade-in">
          <tbody>
            <tr><th>ID</th><td>{contrato.id_Contrato}</td></tr>
            <tr><th>Descripción</th><td>{contrato.descripcion}</td></tr>
            <tr><th>Fecha de Creación</th><td>{new Date(contrato.fecha_Creacion).toLocaleString()}</td></tr>
            <tr><th>Fecha de Modificación</th><td>{new Date(contrato.fecha_Modificacion).toLocaleString()}</td></tr>
            <tr><th>ID Persona</th><td>{contrato.id_Persona}</td></tr>
            <tr><th>Activo</th><td>{contrato.activo ? '✅ Activo' : '❌ Inactivo'}</td></tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContratoPorId;