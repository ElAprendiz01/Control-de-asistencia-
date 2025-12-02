import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import InsertarDatosPersonales from './InsertarDatosPersonales';
import ListarDatosPersonales from './ListarDatosPersonales';
import ActualizarDatosPersonales from './ActualizarDatosPersonales';
import FiltrarDatosPersonales from './FiltrarDatosPersonales';
import FiltrarDatosPersonalesID from './FiltrarDatosPersonalesID';

const DatosPersonalesRoutes = () => {
  const [usuarioActual, setUsuarioActual] = useState('');

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuarioActual(usuarioGuardado);
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestión de Datos Personales</h2>

      <div style={{ marginBottom: '10px' }}>
        <strong>Usuario actual:</strong> {usuarioActual || 'No identificado'}
      </div>

      {/* Menú de navegación */}
      <nav style={{ marginBottom: '20px' }}>
        <Link to="insertar" style={linkStyle}>Insertar</Link>
        <Link to="listar" style={linkStyle}>Listar</Link>
        <Link to="actualizar" style={linkStyle}>Actualizar</Link>
        <Link to="filtrar" style={linkStyle}>Filtrar</Link>
        <Link to="filtrarID" style={linkStyle}>Filtrar por ID</Link>
      </nav>

      {/* Botón de volver */}
      <div style={{ marginBottom: '20px' }}>
        <Link to="/home" style={linkStyleSecundario}>Volver al menú principal</Link>
      </div>

      {/* Rutas */}
      <Routes>
        <Route path="insertar" element={<InsertarDatosPersonales />} />
        <Route path="listar" element={<ListarDatosPersonales />} />
        <Route path="actualizar" element={<ActualizarDatosPersonales />} />
        <Route path="filtrar" element={<FiltrarDatosPersonales />} />
        <Route path="filtrarID" element={<FiltrarDatosPersonalesID />} />
      </Routes>
    </div>
  );
};

const linkStyle = {
  marginRight: '15px',
  padding: '8px 12px',
  backgroundColor: '#007bff',
  color: '#fff',
  borderRadius: '5px',
  textDecoration: 'none',
};

const linkStyleSecundario = {
  ...linkStyle,
  backgroundColor: '#6c757d',
};

export default DatosPersonalesRoutes;
