import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/filtros.css';

const ContactoPorId = () => {
  const [id, setId] = useState('');
  const [contacto, setContacto] = useState(null);
  const [error, setError] = useState('');

  const buscarContacto = async () => {
    if (!id.trim()) {
      setError('⚠️ Ingrese un ID válido.');
      setContacto(null);
      return;
    }

    try {
      const res = await axios.get(`https://localhost:44357/api/Contacto/Buscar_contacto_por_id?id_contacto=${id}`);
      setContacto(res.data[0]);
      setError('');
    } catch (err) {
      setContacto(null);
      setError('❌ No se encontró el contacto o hubo un error en la petición.');
    }
  };

  return (
    <div className="estado-container">
      <h2>🔍 Buscar Contacto por ID</h2>
      <div className="input-group">
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Ingrese ID de contacto"
        />
        <button onClick={buscarContacto}>Buscar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {contacto && (
        <table className="estado-table fade-in">
          <tbody>
            <tr><th>ID</th><td>{contacto.id_Contacto}</td></tr>
            <tr><th>Persona</th><td>{contacto.id_Persona}</td></tr>
            <tr><th>Tipo</th><td>{contacto.tipo_Contacto}</td></tr>
            <tr><th>Contacto</th><td>{contacto.contacto}</td></tr>
            <tr><th>Estado</th><td>{contacto.id_Estado}</td></tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContactoPorId;