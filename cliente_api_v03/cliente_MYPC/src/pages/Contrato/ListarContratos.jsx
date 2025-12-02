import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/tablas_totales.css';

const ListarContratos = () => {
  const [contratos, setContratos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContratos = async () => {
      try {
        const res = await axios.get('https://localhost:44357/api/CONTRATO/listar_contratos');
        setContratos(res.data);
      } catch (err) {
        setError('❌ Error al cargar los contratos.');
      }
    };

    fetchContratos();
  }, []);

  return (
    <div className="tabla-container">
      <h2>📋 Todos los Contratos</h2>
      {error && <p className="error">{error}</p>}

      {contratos.length > 0 ? (
        <table className="tabla-galactica fade-in">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>ID Persona</th>
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
                <td>{c.id_Persona}</td>
                <td>{new Date(c.fecha_Creacion).toLocaleString()}</td>
                <td>{new Date(c.fecha_Modificacion).toLocaleString()}</td>
                <td>{c.activo ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>⏳ Cargando contratos...</p>
      )}
    </div>
  );
};

export default ListarContratos;