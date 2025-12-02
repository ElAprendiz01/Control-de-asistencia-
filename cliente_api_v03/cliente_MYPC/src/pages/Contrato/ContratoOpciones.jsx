import '../../styles/tablas_totales.css';
import { Link } from 'react-router-dom';

export const ContratoTablas = [
  {
    nombre: 'Insertar Contrato',
    descripcion: 'Agrega nuevos contratos al sistema',
    icono: <span>🟢</span>,
    ruta: '/contrato/insertar'
  },
  {
    nombre: 'Actualizar Contrato',
    descripcion: 'Modifica los contratos existentes',
    icono: <span>📄</span>,
    ruta: '/contrato/actualizar'
  },
  {
    nombre: 'Buscar por ID',
    descripcion: 'Consulta un contrato específico por su ID',
    icono: <span>🔍</span>,
    ruta: '/contrato/por-id'
  },
  {
    nombre: 'Buscar por Persona',
    descripcion: 'Filtra contratos por ID de persona',
    icono: <span>👤</span>,
    ruta: '/contrato/por-persona'
  },
  {
    nombre: 'Listar Todos',
    descripcion: 'Visualiza todos los contratos registrados',
    icono: <span>📋</span>,
    ruta: '/contrato/listar'
  }
];

const ContratoOpciones = () => {
  return (
    <div className="grid-opciones">
      {ContratoTablas.map((opcion, i) => (
        <Link key={i} to={opcion.ruta} className="card-opcion">
          <div className="icono-opcion">{opcion.icono}</div>
          <h3 className="titulo-opcion">{opcion.nombre}</h3>
          <p className="descripcion-opcion">{opcion.descripcion}</p>
        </Link>
      ))}
    </div>
  );
};

export default ContratoOpciones;