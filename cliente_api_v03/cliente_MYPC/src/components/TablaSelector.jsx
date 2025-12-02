import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tablasConfig } from '../pages/tablasConfig';
import '../styles/viewtablas.css'; 

const TablaSelector = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll('.icono').forEach(icon => {
        icon.style.animation = 'iconScroll 0.6s ease';
        icon.style.animationFillMode = 'forwards';
        setTimeout(() => {
          icon.style.animation = 'none';
        }, 600);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="tabla-selector">
      <h2>Bienvenido a Empresa MYPC</h2>
      <div className="botones-tablas">
        <div className="card-button">
          <div className="icono">MYPC</div>
        </div>
        {tablasConfig && tablasConfig.length > 0 ? (
          tablasConfig.map(({ nombre, descripcion, icono, ruta }) => (
            <div key={nombre} className="card-button animacion-entrada" onClick={() => navigate(ruta)}>
              <div className="icono">{icono}</div>
              <div className="nombre">{nombre}</div>
              <div className="descripcion">{descripcion}</div>
            </div>
          ))
        ) : (
          <p>No hay tablas disponibles</p>
        )}
      </div>
    </div>
  );
};

export default TablaSelector;