import React, { useEffect, useState } from 'react';
import TablaSelector from '../components/TablaSelector';
import { tablasConfig } from './tablasConfig';
import '../styles/viewtablas.css';
import '../styles/CerrarSesion.css'; // Asegurate de tener este archivo

const Home = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');

  useEffect(() => {
    const nombre = localStorage.getItem('nombreUsuario');
    setNombreUsuario(nombre || 'Usuario');
    console.log('Home cargado para:', nombre);
  }, []);

  const handleCerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('nombreUsuario');
    window.location.href = '/login'; // O usá navigate si tenés react-router
  };

  return (
    <div className="contenedor-bomba animacion-entrada">
      <h2 className="bienvenida">Bienvenido, {nombreUsuario}</h2>

      <div className="cerrar-sesion-container">
        <button className="boton-neon" onClick={handleCerrarSesion}>
          🔒 Cerrar sesión
        </button>
      </div>

      <TablaSelector tablas={tablasConfig} />
    </div>
  );
};

export default Home;