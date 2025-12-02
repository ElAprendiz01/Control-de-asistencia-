import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Table } from "reactstrap";

export default function ListarAsignaturas() {
  const [asignaturas, setAsignaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerAsignaturas = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44325/api/Cls_Asignaturas/OBTENER_ASIGNATURAS"
        );
        console.log("Asignaturas recibidas:", response.data);
        setAsignaturas(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las asignaturas");
        setLoading(false);
      }
    };

    obtenerAsignaturas();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5">
        <h4>Cargando asignaturas...</h4>
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
          <h4>Lista de Asignaturas</h4>
          <hr />
          <Table bordered responsive hover>
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Fecha Creación</th>
                <th>Fecha Modificación</th>
                <th>ID Creador</th>
                <th>ID Modificador</th>
                <th>ID Estado</th>
              </tr>
            </thead>
            <tbody>
              {asignaturas.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No hay asignaturas disponibles
                  </td>
                </tr>
              ) : (
                asignaturas.map((item) => (
                  <tr key={item.id_Asignatura}>
                    <td>{item.id_Asignatura}</td>
                    <td>{item.nombre_Asignatura}</td>
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
