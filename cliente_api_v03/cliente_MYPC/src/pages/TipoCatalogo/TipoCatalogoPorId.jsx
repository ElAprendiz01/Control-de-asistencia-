import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/filtros.css';

const TipoCatalogoPorId = () => {
  const [id, setId] = useState('');
  const [tipo, setTipo] = useState(null);
  const [error, setError] = useState('');

  const buscarTipo = async () => {
    if (!id.trim()) {
      setError('⚠️ Ingrese un ID válido.');
      setTipo(null);
      return;
    }

    try {
      const res = await axios.get(`https://localhost:44357/api/TIPO_CATALOGO/Buscar_tipo_catalogo_por_id?id=${id}`);
      setTipo(res.data[0]);
      setError('');
    } catch (err) {
      setTipo(null);
      setError('❌ No se encontró el tipo catálogo o hubo un error en la petición.');
    }
  };

  return (
    <div className="estado-container">
      <h2>🔍 Buscar Tipo Catálogo por ID</h2>
      <div className="input-group">
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Ingrese ID"
        />
        <button onClick={buscarTipo}>Buscar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {tipo && (
        <table className="estado-table fade-in">
          <tbody>
            <tr><th>ID Tipo Catálogo</th><td>{tipo.id_Tipo_Catalogo}</td></tr>
            <tr><th>Nombre</th><td>{tipo.nombre}</td></tr>
            <tr><th>Fecha de Creación</th><td>{new Date(tipo.fecha_Creacion).toLocaleString()}</td></tr>
            <tr><th>Fecha de Modificación</th><td>{new Date(tipo.fecha_Modificacion).toLocaleString()}</td></tr>
            <tr><th>ID Creador</th><td>{tipo.id_Creador}</td></tr>
            <tr><th>ID Modificador</th><td>{tipo.id_Modificador}</td></tr>
            <tr><th>Activo</th><td>{tipo.activo ? '✅ Activo' : '❌ Inactivo'}</td></tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TipoCatalogoPorId;