import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/filtros.css';

const CatalogoPorId = () => {
  const [id, setId] = useState('');
  const [catalogo, setCatalogo] = useState(null);
  const [error, setError] = useState('');

  const buscarCatalogo = async () => {
    if (!id.trim()) {
      setError('⚠️ Ingrese un ID válido.');
      setCatalogo(null);
      return;
    }

    try {
      const res = await axios.get(`https://localhost:44357/api/CATALOGO/Buscar_catalogo_por_id?id=${id}`);
      setCatalogo(res.data[0]);
      setError('');
    } catch (err) {
      setCatalogo(null);
      setError('❌ No se encontró el catálogo o hubo un error en la petición.');
    }
  };

  return (
    <div className="estado-container">
      <h2>🔍 Buscar Catálogo por ID</h2>
      <div className="input-group">
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Ingrese ID"
        />
        <button onClick={buscarCatalogo}>Buscar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {catalogo && (
        <table className="estado-table fade-in">
          <tbody>
            <tr><th>ID</th><td>{catalogo.id_Catalogo}</td></tr>
            <tr><th>Nombre</th><td>{catalogo.nombre}</td></tr>
            <tr><th>Fecha de Creación</th><td>{new Date(catalogo.fecha_Creacion).toLocaleString()}</td></tr>
            <tr><th>Fecha de Modificación</th><td>{new Date(catalogo.fecha_Modificacion).toLocaleString()}</td></tr>
            <tr><th>ID Creador</th><td>{catalogo.id_Creador}</td></tr>
            <tr><th>ID Modificador</th><td>{catalogo.id_Modificador}</td></tr>
            <tr><th>Activo</th><td>{catalogo.activo ? '✅ Activo' : '❌ Inactivo'}</td></tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CatalogoPorId;