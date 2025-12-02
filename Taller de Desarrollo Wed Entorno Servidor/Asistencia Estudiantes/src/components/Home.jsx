import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/home');
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', marginTop: 50 }}>
      <h1>Asistencia de Estudiantes</h1>
      <p>Selecciona una sección para continuar...</p>

      {/* Aquí puedes agregar botones o links a tus secciones */}
      
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}
