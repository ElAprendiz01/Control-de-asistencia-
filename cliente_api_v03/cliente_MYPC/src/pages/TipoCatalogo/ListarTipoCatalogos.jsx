import React, { useEffect, useState } from 'react';
import '../../styles/ListarTodos.css';

const ListarTipoCatalogos = () => {
  const [tipos, setTipos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje('⚠️ No se encontró el token. Iniciá sesión nuevamente.');
      return;
    }

    const fetchTipos = async () => {
      try {
        const response = await fetch('https://localhost:44357/api/TIPO_CATALOGO/Listar_tipo_catalogo', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setTipos(data);
        } else {
          const errorData = await response.json();
          setMensaje(`❌ Error: ${errorData.mensaje || 'No se pudo obtener la lista'}`);
        }
      } catch (error) {
        setMensaje('⚠️ Error de conexión con el servidor');
      }
    };

    fetchTipos();
  }, []);

  return (
    <div className="contenedor-bomba">
      <h2>Listado de Tipos de Catálogo</h2>
      {mensaje && <p>{mensaje}</p>}
      {tipos.length > 0 ? (
        <div className="tabla-scroll">
          <table className="tabla-estado">
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
              {tipos.map((tipo) => (
                <tr key={tipo.id_Tipo_Catalogo}>
                  <td>{tipo.id_Tipo_Catalogo}</td>
                  <td>{tipo.nombre}</td>
                  <td>{tipo.fecha_Creacion}</td>
                  <td>{tipo.fecha_Modificacion}</td>
                  <td>{tipo.id_Creador}</td>
                  <td>{tipo.id_Modificador}</td>
                  <td>{tipo.activo ? '✅' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !mensaje && <p>No hay tipos de catálogo registrados.</p>
      )}
    </div>
  );
};

export default ListarTipoCatalogos;