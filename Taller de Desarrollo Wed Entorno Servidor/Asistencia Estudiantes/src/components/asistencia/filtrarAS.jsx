import { useState } from "react";
import { appsettings } from "../settings/appsettings";
import { Container, Row, Col, Table, Button, Input } from "reactstrap";

export default function FiltrarAsistencia() {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);

  // Función para buscar asistencias filtrando por id_Estudiante_Grupo enviado en header
  const filtrarAsistencia = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Id_Estudiante_Grupo": busqueda,
      },
    };

    try {
      const res = await fetch(
        `${appsettings.apiUrl}Cls_Asistencias/BUSCAR_ASISTENCIA`,
        requestOptions
      );

      if (!res.ok) {
        if (res.status === 204) {
          setResultados([]);
          setError(null);
          return;
        }
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      setResultados(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      setResultados([]);
      setError(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 10, offset: 1 }}>
          <h4>Filtrar Asistencias (por ID Estudiante Grupo)</h4>
          <Input
            type="text"
            placeholder="Buscar por ID Estudiante Grupo..."
            className="mb-3"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <Button color="primary" onClick={filtrarAsistencia}>
            Buscar
          </Button>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <Table bordered className="mt-3">
            <thead>
              <tr>
                <th>ID Asistencia</th>
                <th>ID Estudiante Grupo</th>
                <th>Fecha</th>
                <th>Asistió</th>
                <th>ID Creador</th>
                <th>ID Modificador</th>
                <th>Fecha Creación</th>
                <th>Fecha Modificación</th>
                <th>ID Estado</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((item) => (
                <tr key={item.id_Asistencia}>
                  <td>{item.id_Asistencia}</td>
                  <td>{item.id_Estudiante_Grupo}</td>
                  <td>{item.fecha}</td>
                  <td>{item.asistio ? "Sí" : "No"}</td>
                  <td>{item.id_Creador}</td>
                  <td>{item.id_Modificador}</td>
                  <td>{item.fecha_Creacion}</td>
                  <td>{item.fecha_Modificacion}</td>
                  <td>{item.id_Estado}</td>
                </tr>
              ))}
              {resultados.length === 0 && !error && (
                <tr>
                  <td colSpan="9" className="text-center">
                    No se encontraron asistencias. Escribe en el buscador y presiona "Buscar".
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
