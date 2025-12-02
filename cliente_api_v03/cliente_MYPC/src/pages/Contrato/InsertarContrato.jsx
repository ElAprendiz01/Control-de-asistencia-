import React, { useState } from 'react';
import '../../styles/iinserActu.css';

const InsertarContrato = () => {
  const [idPersona, setIdPersona] = useState('');
  const [idPuesto, setIdPuesto] = useState('');
  const [tipoContrato, setTipoContrato] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [idEstado, setIdEstado] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje('⚠️ No se encontró el token. Iniciá sesión nuevamente.');
      return;
    }

    // Validación previa
    if (
      !idPersona || isNaN(parseInt(idPersona)) ||
      !idPuesto || isNaN(parseInt(idPuesto)) ||
      !tipoContrato || isNaN(parseInt(tipoContrato)) ||
      !fechaInicio || !fechaFin ||
      !idEstado || isNaN(parseInt(idEstado))
    ) {
      setMensaje('⚠️ Todos los campos son obligatorios y deben tener valores válidos.');
      return;
    }

    const data = {
      Id_Persona: parseInt(idPersona),
      Id_Puesto: parseInt(idPuesto),
      Tipo_Contrato: parseInt(tipoContrato),
      Fecha_Inicio: fechaInicio,
      Fecha_Fin: fechaFin,
      Id_Estado: parseInt(idEstado)
    };

    try {
      const response = await fetch('https://localhost:44357/api/CONTRATO/Insertar_contrato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setMensaje('✅ Contrato insertado correctamente');
        setIdPersona('');
        setIdPuesto('');
        setTipoContrato('');
        setFechaInicio('');
        setFechaFin('');
        setIdEstado('');
      } else {
        const errorData = await response.json();
        setMensaje(`❌ Error: ${errorData.mensaje || 'No se pudo insertar'}`);
      }
    } catch (error) {
      setMensaje('⚠️ Error de conexión con el servidor');
    }
  };

  return (
    <div className="formulario-galactico">
      <h2>🟢 Insertar Contrato</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label>ID Persona:</label>
          <input type="number" value={idPersona} onChange={e => setIdPersona(e.target.value)} required />
        </div>
        <div className="campo">
          <label>ID Puesto:</label>
          <input type="number" value={idPuesto} onChange={e => setIdPuesto(e.target.value)} required />
        </div>
        <div className="campo">
          <label>Tipo de Contrato (ID Catálogo):</label>
          <input type="number" value={tipoContrato} onChange={e => setTipoContrato(e.target.value)} required />
        </div>
        <div className="campo">
          <label>Fecha Inicio:</label>
          <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} required />
        </div>
        <div className="campo">
          <label>Fecha Fin:</label>
          <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} required />
        </div>
        <div className="campo">
          <label>ID Estado:</label>
          <input type="number" value={idEstado} onChange={e => setIdEstado(e.target.value)} required />
        </div>
        <button type="submit" className="boton-neon">Insertar</button>
      </form>
      {mensaje && <p className="mensaje-feedback">{mensaje}</p>}
    </div>
  );
};

export default InsertarContrato;