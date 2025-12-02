import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:44357/api/controlador_de_acceso/LOGIN', {
        usuario: correo,
        contrasena: clave,
      });

      const token = response.data.tokenAccess.token;
      const usuario = response.data.usuario;

      // Validar expiración del token
      const payload = jwtDecode(token);
      const now = Date.now() / 1000;
      if (payload.exp < now) {
        Swal.fire('Sesión expirada', 'Por favor inicia sesión nuevamente', 'warning');
        return;
      }

      // Guardar datos en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('rol', usuario.rol || 'sin rol');
      localStorage.setItem('idUsuario', usuario.id || 0);
      localStorage.setItem('nombreUsuario', usuario.nombre || 'Usuario');

      Swal.fire('Éxito', 'Inicio de sesión correcto', 'success');
      navigate('/tablas');
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Credenciales inválidas o error de conexión';
      Swal.fire('Error', mensaje, 'error');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">Bienvenido a empresa MYPC</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="correo">Correo</label>
            <input
              type="text"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="clave">Clave</label>
            <input
              type="password"
              id="clave"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;