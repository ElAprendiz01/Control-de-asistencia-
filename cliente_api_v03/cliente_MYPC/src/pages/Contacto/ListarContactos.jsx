import React, { useEffect, useState } from 'react';
import '../../styles/ListarTodos.css';

const ListarContacto = () => {
  const [contactos, setContactos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje('⚠️ No se encontró el token. Iniciá sesión nuevamente.');
      return;
    }

    const fetchContactos = async () => {
      try {
        const response = await fetch('https://localhost:44357/api/Contacto/Listar_contacto', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setContactos(data);
        } else {
          const errorData = await response.json();
          setMensaje(`❌ Error: ${errorData.mensaje || 'No se pudo obtener la lista'}`);
        }
      } catch {
        setMensaje('⚠️ Error de conexión con el servidor');
      }
    };

    fetchContactos();
  }, []);

  return (
    <div className="contenedor-bomba">
      <h2>📋 Listado de Contactos</h2>
      {mensaje && <p>{mensaje}</p>}
      {contactos.length > 0 ? (
        <div className="tabla-scroll">
          <table className="tabla-estado">
            <thead>
              <tr>
                <th>ID</th>
                <th>ID Persona</th>
                <th>Tipo</th>
                <th>Contacto</th>
                <th>Fecha Creación</th>
                <th>Fecha Modificación</th>
                <th>ID Creador</th>
                <th>ID Modificador</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {contactos.map((c) => (
                <tr key={c.id_Contacto}>
                  <td>{c.id_Contacto}</td>
                  <td>{c.id_Persona}</td>
                  <td>{c.tipo_Contacto}</td>
                  <td>{c.contacto}</td>
                  <td>{c.fecha_Creacion?.split('T')[0]}</td>
                  <td>{c.fecha_Modificacion?.replace('T', ' ').substring(0, 19)}</td>
                  <td>{c.id_Creador}</td>
                  <td>{c.id_Modificador}</td>
                  <td>{c.id_Estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !mensaje && <p>No hay registros disponibles.</p>
      )}
    </div>
  );
};

export default ListarContacto;