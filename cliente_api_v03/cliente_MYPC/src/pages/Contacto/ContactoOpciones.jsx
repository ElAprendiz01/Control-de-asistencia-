import '../../styles/tablas_totales.css';
import { Link } from 'react-router-dom';

export const ContactoOpcionesTablas = [
  {
    nombre: 'Insertar Contacto',
    descripcion: 'Agrega un nuevo contacto',
    icono: <span>📞</span>,
    ruta: '/contacto/insertar'
  },
  {
    nombre: 'Actualizar Contacto',
    descripcion: 'Modifica un contacto existente',
    icono: <span>✏️</span>,
    ruta: '/contacto/actualizar'
  },
  {
    nombre: 'Buscar por ID',
    descripcion: 'Consulta un contacto específico',
    icono: <span>🔍</span>,
    ruta: '/contacto/por-id'
  },
  {
    nombre: 'Listar Todos',
    descripcion: 'Visualiza todos los contactos',
    icono: <span>📋</span>,
    ruta: '/contacto/listar'
  }
  ,{
    nombre: 'filtroo por ID  persona ',
    descripcion: 'Visualiza todos los contactos',
    icono: <span>📋</span>,
    ruta: '/contacto/filtrar-nombre'
  }
];

const ContactoOpciones = () => {
  return (
    <div className="grid-opciones">
      {ContactoOpcionesTablas.map((opcion, i) => (
        <Link key={i} to={opcion.ruta} className="card-opcion">
          <div className="icono-opcion">{opcion.icono}</div>
          <h3 className="titulo-opcion">{opcion.nombre}</h3>
          <p className="descripcion-opcion">{opcion.descripcion}</p>
        </Link>
      ))}
    </div>
  );
};

export default ContactoOpciones;