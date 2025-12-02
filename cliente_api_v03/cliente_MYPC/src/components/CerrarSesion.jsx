import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/CerrarSesion.css';

const CerrarSesion = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Tu sesión actual será finalizada.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // 🧹 Limpiar localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('nombreUsuario');

        // 🚪 Redirigir
        navigate('/login');

        Swal.fire('Sesión cerrada', 'Has salido correctamente.', 'success');
      }
    });
  };

  return (
    <div className="cerrar-sesion-container">
      <button className="boton-neon" onClick={handleLogout}>
        🔒 Cerrar Sesión
      </button>
    </div>
  );
};

export default CerrarSesion;