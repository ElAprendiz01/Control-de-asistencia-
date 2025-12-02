import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/filtros.css';

const FiltrarCatalogoPorNombre = () => {
  const [nombre, setNombre] = useState('');
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState('');

  const buscarPorNombre = async () => {
    if (!nombre.trim()) {
      setError('⚠️ Ingrese un nombre válido.');
      setResultados([]);
      return;
    }

    try {
      const res = await axios.get(`https://localhost:44357/api/CATALOGO/Filtrar_catalogo?nombre=${encodeURIComponent(nombre)}`);
      setResultados(res.data);
      setError('');
    } catch (err) {
      setResultados([]);
      setError('❌ No se encontraron resultados o hubo un error en la petición.');
    }
  };

  return (
    <div className="estado-container">
      <h2>🔍 Filtrar Catálogo por Nombre</h2>
      <div className="input-group">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingrese nombre"
        />
        <button onClick={buscarPorNombre}>Buscar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {resultados.length > 0 && (
        <table className="estado-table fade-in">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Fecha Creación</th>
              <th>Fecha Modificación</th>
              <th>ID Creador</th>
              <th>ID Modificador</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((item, index) => (
              <tr key={index}>
                <td>{item.id_Catalogo}</td>
                <td>{item.nombre}</td>
                <td>{item.fecha_Creacion}</td>
                <td>{item.fecha_Modificacion}</td>
                <td>{item.id_Creador}</td>
                <td>{item.id_Modificador}</td>
                <td>{item.activo ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FiltrarCatalogoPorNombre;