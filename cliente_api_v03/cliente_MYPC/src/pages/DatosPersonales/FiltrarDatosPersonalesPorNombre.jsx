import React, { useState } from 'react';
import '../../styles/filtros.css';

const FiltrarDatosPersonalesPorNombre = () => {
  const [nombre, setNombre] = useState('');
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState('');

  const buscarPorNombre = async () => {
    if (!nombre.trim()) {
      setError('⚠️ Ingrese un nombre válido.');
      setResultados([]);
      return;
    }

    try {
      const res = await fetch(`https://localhost:44357/api/DATOS_PERSONALES/Filtrar_datos_personales?nombre=${encodeURIComponent(nombre)}`);
      const data = await res.json();
      setResultados(data);
      setError('');
    } catch (err) {
      setResultados([]);
      setError('❌ No se encontraron resultados o hubo un error en la petición.');
    }
  };

  return (
    <div className="estado-container">
      <h2>🔍 Filtrar Datos Personales por Nombre</h2>
      <div className="input-group">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingrese nombre"
        />
        <button onClick={buscarPorNombre}>Buscar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {resultados.length > 0 && (
        <table className="estado-table fade-in">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>Género</th>
              <th>Fecha Nacimiento</th>
              <th>DNI</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((persona, index) => (
              <tr key={index}>
                <td>{persona.id_Persona}</td>
                <td>{`${persona.primer_Nombre} ${persona.segundo_Nombre || ''} ${persona.primer_Apellido} ${persona.segundo_Apellido || ''}`}</td>
                <td>{persona.genero}</td>
                <td>{new Date(persona.fecha_Nacimiento).toLocaleDateString()}</td>
                <td>{persona.dni}</td>
                <td>{persona.id_Estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FiltrarDatosPersonalesPorNombre