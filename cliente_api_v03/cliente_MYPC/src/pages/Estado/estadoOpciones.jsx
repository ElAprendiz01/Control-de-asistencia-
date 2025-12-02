import '../../styles/tablas_totales.css';

import { Link } from 'react-router-dom';

export const Estadotablas = [
  {
    nombre: 'Insertar Estado',
    descripcion: 'Insertar estados del sistema',
    icono: <span>🟢</span>,
    ruta: '/estado/insertar'
  },
  {
    nombre: 'Actualizar Estado',
    descripcion: 'Actualizar estados del sistema',
    icono: <span>📁</span>,
    ruta: '/estado/actualizar'
  },
  {
    nombre: 'Filtrar estado por nombre',
    descripcion: 'Filtrar estados del sistema',
    icono: <span>📚</span>,
    ruta: '/estado/filtrar-nombre'
  },
  {
    nombre: 'Estado por ID',
    descripcion: 'Filtra los estados por ID',
    icono: <span>👤</span>,
    ruta: '/estado/por-id'
  },
  {
    nombre: 'Listar Todos los estados',
    descripcion: 'Lista todo a detalle',
    icono: <span>👥</span>,
    ruta: '/estado/listar-todos'
  }
];

const EstadoOpciones = () => {
  return (
    <div className="grid-opciones">
      {Estadotablas.map((opcion, i) => (
        <Link key={i} to={opcion.ruta} className="card-opcion">
          <div className="icono-opcion">{opcion.icono}</div>
          <h3 className="titulo-opcion">{opcion.nombre}</h3>
          <p className="descripcion-opcion">{opcion.descripcion}</p>
        </Link>
      ))}
    </div>
  );
};

export default EstadoOpciones;