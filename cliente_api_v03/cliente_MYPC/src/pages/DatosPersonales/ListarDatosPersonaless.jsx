import React, { useEffect, useState } from 'react';
import '../../styles/ListarTodos.css';

const ListarDatosPersonales = () => {
  const [personas, setPersonas] = useState([]);
  const [catalogos, setCatalogos] = useState({ genero: [], tipoDNI: [], estado: [] });
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje('⚠️ No se encontró el token. Iniciá sesión nuevamente.');
      return;
    }

  

    const fetchPersonas = async () => {
      try {
        const response = await fetch('https://localhost:44357/api/DATOS_PERSONALES/Listar_datos_personales', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPersonas(data);
        } else {
          const errorData = await response.json();
          setMensaje(`❌ Error: ${errorData.mensaje || 'No se pudo obtener la lista'}`);
        }
      } catch {
        setMensaje('⚠️ Error de conexión con el servidor');
      }
    };

 
    fetchPersonas();
  }, []);

  const obtenerNombre = (tipo, id) => {
    const lista = catalogos[tipo];
    if (!lista || lista.length === 0) return ` ${id}`;

    if (tipo === 'estado') {
      const item = lista.find(e => e.id_Estado === id);
      return item?.nombre || ` ${id}`;
    } else {
      const item = lista.find(c => c.id_Catalogo === id);
      return item?.nombre || ` ${id}`;
    }
  };

  return (
    <div className="contenedor-bomba">
      <h2>Listado de Datos Personales</h2>
      {mensaje && <p>{mensaje}</p>}
      {personas.length > 0 ? (
        <div className="tabla-scroll">
          <table className="tabla-estado">
            <thead>
              <tr>
                <th>ID</th>
                <th>Primer Nombre</th>
                <th>Segundo Nombre</th>
                <th>Primer Apellido</th>
                <th>Segundo Apellido</th>
                <th>Género</th>
                <th>Fecha Nacimiento</th>
                <th>Tipo DNI</th>
                <th>DNI</th>
                <th>Fecha Creación</th>
                <th>Fecha Modificación</th>
                <th>ID Creador</th>
                <th>ID Modificador</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {personas.map((p) => (
                <tr key={p.id_Persona}>
                  <td>{p.id_Persona}</td>
                  <td>{p.primer_Nombre}</td>
                  <td>{p.segundo_Nombre || ''}</td>
                  <td>{p.primer_Apellido}</td>
                  <td>{p.segundo_Apellido || ''}</td>
                  <td>{obtenerNombre('genero', p.genero)}</td>
                  <td>{p.fecha_Nacimiento?.split('T')[0]}</td>
                  <td>{obtenerNombre('tipoDNI', p.tipo_DNI)}</td>
                  <td>{p.dni}</td>
                  <td>{p.fecha_Creacion?.split('T')[0]}</td>
                  <td>{p.fecha_Modificacion?.replace('T', ' ').substring(0, 19)}</td>
                  <td>{p.id_Creador}</td>
                  <td>{p.id_Modificador}</td>
                  <td>{obtenerNombre('estado', p.id_Estado)}</td>
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

export default ListarDatosPersonales;