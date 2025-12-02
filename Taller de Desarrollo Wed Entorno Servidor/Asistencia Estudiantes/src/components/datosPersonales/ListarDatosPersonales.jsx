import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container } from 'reactstrap';

const ListarDatosPersonales = () => {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:44325/api/Tbl_Datos_Personales/OBTENER_DATOS_PERSONALES')
      .then(response => {
        console.log('Datos recibidos:', response.data);
        setPersonas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h3>Lista de Datos Personales</h3>

      <Table bordered responsive hover striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Edad</th>
            <th>Género</th>
          </tr>
        </thead>
        <tbody>
          {personas.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No hay datos personales para mostrar.
              </td>
            </tr>
          ) : (
            personas.map((p) => (
              <tr key={p.id_Persona}>
                <td>{p.id_Persona}</td>
                <td>{`${p.primer_Nombre} ${p.segundo_Nombre}`.trim()}</td>
                <td>{`${p.primer_Apellido} ${p.segundo_Apellido}`.trim()}</td>
                <td>{p.edad}</td>
                <td>{p.genero}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListarDatosPersonales;


