import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container } from "reactstrap";

function ListarEstudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    obtenerEstudiantes();
  }, []);

  const obtenerEstudiantes = async () => {
    try {
      const response = await axios.get("https://localhost:44325/api/Tbl_Estudiantes/OBTENER_ESTUDIANTES");
      console.log("Datos recibidos:", response.data);
      setEstudiantes(response.data);
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Lista de Estudiantes</h3>
      </div>

      <Table bordered responsive hover striped>
        <thead>
          <tr>
            <th>ID Estudiante</th>
            <th>ID Persona</th>
            <th>Fecha Creación</th>
            <th>Fecha Modificación</th>
            <th>ID Creador</th>
            <th>ID Modificador</th>
            <th>ID Estado</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No hay estudiantes para mostrar.
              </td>
            </tr>
          ) : (
            estudiantes.map((e) => (
              <tr key={e.id_Estudiante}>
                <td>{e.id_Estudiante}</td>
                <td>{e.id_Persona}</td>
                <td>{e.fecha_Creacion}</td>
                <td>{e.fecha_Modificacion}</td>
                <td>{e.id_Creador}</td>
                <td>{e.id_Modificador}</td>
                <td>{e.id_Estado}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListarEstudiantes;
