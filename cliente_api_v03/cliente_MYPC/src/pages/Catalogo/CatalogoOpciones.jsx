import '../../styles/tablas_totales.css';
import { Link } from 'react-router-dom';

export const CatalogoTablas = [
  {
    nombre: 'Insertar Catálogo',
    descripcion: 'Agrega nuevos catálogos al sistema',
    icono: <span>🟢</span>,
    ruta: '/catalogo/insertar'
  },
  {
    nombre: 'Actualizar Catálogo',
    descripcion: 'Modifica los catálogos existentes',
    icono: <span>📁</span>,
    ruta: '/catalogo/actualizar'
  },
  {
    nombre: 'Filtrar por Nombre',
    descripcion: 'Busca catálogos por nombre',
    icono: <span>📚</span>,
    ruta: '/catalogo/filtrar-nombre'
  },
  {
    nombre: 'Buscar por ID',
    descripcion: 'Consulta un catálogo específico por su ID',
    icono: <span>👤</span>,
    ruta: '/catalogo/por-id'
  },
  {
    nombre: 'Listar Todos',
    descripcion: 'Visualiza todos los catálogos registrados',
    icono: <span>👥</span>,
    ruta: '/catalogo/listar'
  }
];

const CatalogoOpciones = () => {
  return (
    <div className="grid-opciones">
      {CatalogoTablas.map((opcion, i) => (
        <Link key={i} to={opcion.ruta} className="card-opcion">
          <div className="icono-opcion">{opcion.icono}</div>
          <h3 className="titulo-opcion">{opcion.nombre}</h3>
          <p className="descripcion-opcion">{opcion.descripcion}</p>
        </Link>
      ))}
    </div>
  );
};

export default CatalogoOpciones;