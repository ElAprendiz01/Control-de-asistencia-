import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/filtros.css'

const EstadoPorId = () => {
  const [id, setId] = useState('');
  const [estado, setEstado] = useState(null);
  const [error, setError] = useState('');

  const buscarEstado = async () => {
    if (!id.trim()) {
      setError('⚠️ Ingrese un ID válido.');
      setEstado(null);
      return;
    }

    try {
      const res = await axios.get(`https://localhost:44357/api/ESTADOS/Buscar_estado_por_id?id=${id}`);
      setEstado(res.data[0]); // suponiendo que devuelve un array con un solo objeto
      setError('');
    } catch (err) {
      setEstado(null);
      setError('❌ No se encontró el estado o hubo un error en la petición.');
    }
  };

  return (
    <div className="estado-container">
      <h2>🔍 Buscar Estado por ID</h2>
      <div className="input-group">
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Ingrese ID"
        />
        <button onClick={buscarEstado}>Buscar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {estado && (
        <table className="estado-table fade-in">
          <tbody>
            <tr><th>ID Estado</th><td>{estado.id_Estado}</td></tr>
            <tr><th>Estado</th><td>{estado.estado}</td></tr>
            <tr><th>Fecha de Creación</th><td>{new Date(estado.fecha_Creacion).toLocaleString()}</td></tr>
            <tr><th>Fecha de Modificación</th><td>{new Date(estado.fecha_Modificacion).toLocaleString()}</td></tr>
            <tr><th>ID Creador</th><td>{estado.id_Creador}</td></tr>
            <tr><th>ID Modificador</th><td>{estado.id_Modificador}</td></tr>
            <tr><th>Activo</th><td>{estado.activo ? '✅ Activo' : '❌ Inactivo'}</td></tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EstadoPorId;