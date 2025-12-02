import '../../styles/tablas_totales.css';
import { Link } from 'react-router-dom';

export const TipoCatalogoTablas = [
  {
    nombre: 'Insertar Tipo Catálogo',
    descripcion: 'Agrega nuevos tipos de catálogo al sistema',
    icono: <span>🟢</span>,
    ruta: '/tipo-catalogo/insertar'
  },
  {
    nombre: 'Actualizar Tipo Catálogo',
    descripcion: 'Modifica los tipos de catálogo existentes',
    icono: <span>📁</span>,
    ruta: '/tipo-catalogo/actualizar'
  },
  {
    nombre: 'Filtrar por Nombre',
    descripcion: 'Busca tipos de catálogo por nombre',
    icono: <span>📚</span>,
    ruta: '/tipo-catalogo/filtrar-nombre'
  },
  {
    nombre: 'Buscar por ID',
    descripcion: 'Consulta un tipo catálogo específico por su ID',
    icono: <span>👤</span>,
    ruta: '/tipo-catalogo/por-id'
  },
  {
    nombre: 'Listar Todos',
    descripcion: 'Visualiza todos los tipos de catálogo registrados',
    icono: <span>👥</span>,
    ruta: '/tipo-catalogo/listar'
  }
];

const TipoCatalogoOpciones = () => {
  return (
    <div className="grid-opciones">
      {TipoCatalogoTablas.map((opcion, i) => (
        <Link key={i} to={opcion.ruta} className="card-opcion">
          <div className="icono-opcion">{opcion.icono}</div>
          <h3 className="titulo-opcion">{opcion.nombre}</h3>
          <p className="descripcion-opcion">{opcion.descripcion}</p>
        </Link>
      ))}
    </div>
  );
};

export default TipoCatalogoOpciones;