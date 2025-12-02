import { useState } from "react";
import { appsettings } from "../settings/appsettings";
import { Container, Row, Col, Table, Button, Input } from "reactstrap";

export default function FiltrarIDAsistencia() {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);

  const handleBuscar = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Id_Asistencia': busqueda
      }
    };

    try {
      const res = await fetch(`${appsettings.apiUrl}Cls_Asistencias/BUSCAR_ASISTENCIA_POR_ID`, requestOptions);
      
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
          <h4>Filtrar Asistencia por ID</h4>
          <Input
            type="text"
            placeholder="Buscar por ID..."
            className="mb-3"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <Button color="primary" onClick={handleBuscar}>
            Buscar
          </Button>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          <Table bordered className="mt-3">
            <thead>
              <tr>
                <th>ID Asistencia</th>
                <th>Fecha</th>
                <th>ID Estudiante</th>
                <th>Presente</th>
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
                  <td>{item.fecha}</td>
                  <td>{item.id_Estudiante}</td>
                  <td>{item.presente ? "Sí" : "No"}</td>
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
                    No se encontró asistencia. Escribe un ID y presiona "Buscar".
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
