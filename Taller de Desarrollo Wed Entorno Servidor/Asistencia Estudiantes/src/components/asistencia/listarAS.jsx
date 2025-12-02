import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Table } from "reactstrap";

export default function ListarAsistencias() {
  const [asistencia, setAsistencia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerAsistencias = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44325/api/Tbl_Asistencias/OBTENER_ASISTENCIAS"
        );
        console.log("Asistencias recibidas:", response.data);
        setAsistencia(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las asistencias");
        setLoading(false);
      }
    };

    obtenerAsistencias();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5">
        <h4>Cargando asistencias...</h4>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <h4>{error}</h4>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 10, offset: 1 }}>
          <h4>Lista de Asistencias</h4>
          <hr />
          <Table bordered responsive hover>
            <thead className="table-dark">
              <tr>
                <th>ID Asistencia</th>
                <th>ID Estudiante Grupo</th>
                <th>ID Grupo Asignatura</th>
                <th>ID Docente Grupo</th>
                <th>Fecha</th>
                <th>Asistió</th>
                <th>Observación</th>
                <th>Fecha Creación</th>
                <th>Fecha Modificación</th>
                <th>ID Creador</th>
                <th>ID Modificador</th>
                <th>ID Estado</th>
              </tr>
            </thead>
            <tbody>
              {asistencia.length === 0 ? (
                <tr>
                  <td colSpan="12" className="text-center">
                    No hay asistencias disponibles
                  </td>
                </tr>
              ) : (
                asistencia.map((item) => (
                  <tr key={item.id_Asistencia}>
                    <td>{item.id_Asistencia}</td>
                    <td>{item.id_Estudiante_Grupo}</td>
                    <td>{item.id_Grupo_Asignatura}</td>
                    <td>{item.id_Docente_Grupo}</td>
                    <td>{item.fecha}</td>
                    <td>{item.asistio}</td>
                    <td>{item.observacion}</td>
                    <td>{item.fecha_Creacion}</td>
                    <td>{item.fecha_Modificacion}</td>
                    <td>{item.id_Creador}</td>
                    <td>{item.id_Modificador}</td>
                    <td>{item.id_Estado}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
