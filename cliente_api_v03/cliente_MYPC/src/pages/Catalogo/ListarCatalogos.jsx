import React, { useEffect, useState } from 'react';
import '../../styles/ListarTodos.css';

const ListarCatalogo = () => {
  const [catalogos, setCatalogos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje('⚠️ Token no encontrado. Iniciá sesión.');
      return;
    }

    const fetchCatalogos = async () => {
      try {
        const response = await fetch('https://localhost:44357/api/CATALOGO/Listar_catalogo', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCatalogos(data);
        } else {
          const errorData = await response.json();
          setMensaje(`❌ Error: ${errorData.mensaje || 'No se pudo obtener la lista'}`);
        }
      } catch (error) {
        setMensaje('⚠️ Error de conexión con el servidor');
      }
    };

    fetchCatalogos();
  }, []);

  return (
    <div className="contenedor-bomba">
      <h2>Listado de Catálogos</h2>
      {mensaje && <p>{mensaje}</p>}
      {catalogos.length > 0 ? (
        <div className="tabla-scroll">
          <table className="tabla-catalogo">
            <thead>
              <tr>
                <th>ID</th>
                <th>ID Tipo Catálogo</th>
                <th>Nombre</th>
                <th>Fecha Creación</th>
                <th>Fecha Modificación</th>
                <th>ID Creador</th>
                <th>ID Modificador</th>
                <th>Activo</th>
              </tr>
            </thead>
            <tbody>
              {catalogos.map((item) => (
                <tr key={item.id_Catalogo}>
                  <td>{item.id_Catalogo}</td>
                  <td>{item.id_Tipo_Catalogo}</td>
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
        </div>
      ) : (
        !mensaje && <p>No hay catálogos registrados.</p>
      )}
    </div>
  );
};

export default ListarCatalogo;