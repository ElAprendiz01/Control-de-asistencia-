import '../../styles/tablas_totales.css';
import { Link } from 'react-router-dom';

export const DatosPersonalesTablas = [
  {
    nombre: 'Insertar Datos Personales',
    descripcion: 'Agrega nuevos registros al sistema',
    icono: <span>🟢</span>,
    ruta: '/datos-personales/insertar'
  },
  {
    nombre: 'Actualizar Datos Personales',
    descripcion: 'Modifica registros existentes',
    icono: <span>📁</span>,
    ruta: '/datos-personales/actualizar'
  },
  {
    nombre: 'Filtrar por Nombre',
    descripcion: 'Busca personas por nombre',
    icono: <span>📚</span>,
    ruta: '/datos-personales/filtrar-nombre'
  },
  {
    nombre: 'Buscar por ID',
    descripcion: 'Consulta una persona específica por su ID',
    icono: <span>👤</span>,
    ruta: '/datos-personales/por-id'
  },
  {
    nombre: 'Listar Todos',
    descripcion: 'Visualiza todos los registros de personas',
    icono: <span>👥</span>,
    ruta: '/datos-personales/listar'
  }
];

const DatosPersonalesOpciones = () => {
  return (
    <div className="grid-opciones">
      {DatosPersonalesTablas.map((opcion, i) => (
        <Link key={i} to={opcion.ruta} className="card-opcion">
          <div className="icono-opcion">{opcion.icono}</div>
          <h3 className="titulo-opcion">{opcion.nombre}</h3>
          <p className="descripcion-opcion">{opcion.descripcion}</p>
        </Link>
      ))}
    </div>
  );
};

export default DatosPersonalesOpciones;