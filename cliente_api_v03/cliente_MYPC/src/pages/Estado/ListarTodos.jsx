import React, { useEffect, useState } from 'react';
import '../../styles/ListarTodos.css';

const ListarEstados = () => {
  const [estados, setEstados] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje('⚠️ No se encontró el token. Iniciá sesión nuevamente.');
      return;
    }

    const fetchEstados = async () => {
      try {
        const response = await fetch('https://localhost:44357/api/ESTADOS/Listar_estado', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setEstados(data);
        } else {
          const errorData = await response.json();
          setMensaje(`❌ Error: ${errorData.mensaje || 'No se pudo obtener la lista'}`);
        }
      } catch (error) {
        setMensaje('⚠️ Error de conexión con el servidor');
      }
    };

    fetchEstados();
  }, []);

  return (
    <div className="contenedor-bomba">
      <h2>Listado de Estados</h2>
      {mensaje && <p>{mensaje}</p>}
      {estados.length > 0 ? (
        <div className="tabla-scroll">
          <table className="tabla-estado">
            <thead>
              <tr>
                <th>ID</th>
                <th>Estado</th>
                <th>Fecha Creación</th>
                <th>Fecha Modificación</th>
                <th>ID Creador</th>
                <th>ID Modificador</th>
                <th>Activo</th>
              </tr>
            </thead>
            <tbody>
              {estados.map((estado) => (
                <tr key={estado.id_Estado}>
                  <td>{estado.id_Estado}</td>
                  <td>{estado.estado}</td>
                  <td>{estado.fecha_Creacion}</td>
                  <td>{estado.fecha_Modificacion}</td>
                  <td>{estado.id_Creador}</td>
                  <td>{estado.id_Modificador}</td>
                  <td>{estado.activo ? '✅' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !mensaje && <p>No hay estados registrados.</p>
      )}
    </div>
  );
};

export default ListarEstados;