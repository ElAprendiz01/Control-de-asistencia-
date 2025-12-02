import { useState } from "react";
import { appsettings } from "../settings/appsettings";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Input,
  Form,
  FormGroup,
} from "reactstrap";

export default function FiltrarEstudiantes() {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const columnas = [
    "ID Estudiante",
    "ID Persona",
    "Fecha Creación",
    "Fecha Modificación",
    "ID Creador",
    "ID Modificador",
    "ID Estado",
  ];

  const validarBusqueda = (texto) => /^[0-9]{0,5}$/.test(texto);

  const handleBuscar = async () => {
    if (busqueda.trim() === "") {
      setResultados([]);
      setError(null);
      return;
    }

    if (!validarBusqueda(busqueda)) {
      setError("Solo números. Máximo 5 dígitos.");
      setResultados([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${appsettings.apiUrl}Tbl_Estudiantes/BUSCAR_ESTUDIANTES`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Id_Estudiante: busqueda.trim(),
        },
      });

      if (!res.ok) {
        setError(`Error al consultar: ${res.status} ${res.statusText}`);
        setResultados([]);
      } else {
        const text = await res.text();

        if (!text || text === "[]") {
          setResultados([]);
          setError("Estudiante no existe.");
        } else {
          try {
            const data = JSON.parse(text);
            const arr = Array.isArray(data) ? data : [data];
            setResultados(arr);
            setError(null);
          } catch {
            setResultados([]);
            setError("Error al procesar la respuesta del servidor.");
          }
        }
      }
    } catch (error) {
      setResultados([]);
      setError("Error de red o servidor: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mb-3">
        <Col sm="auto" className="text-center">
          <h5>Buscar Estudiante por ID</h5>
        </Col>
      </Row>

      <Row className="justify-content-center mb-4">
        <Col sm="auto">
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormGroup className="d-flex align-items-center gap-2">
              <Input
                type="text"
                maxLength={5}
                placeholder="ID Estudiante (número)"
                style={{ width: "200px" }}
                value={busqueda}
                onChange={(e) => {
                  const valor = e.target.value;
                  if (validarBusqueda(valor)) {
                    setBusqueda(valor);
                    setError(null);
                  } else {
                    setError("");
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleBuscar();
                }}
              />
              <Button color="primary" onClick={handleBuscar} disabled={loading}>
                {loading ? "Buscando..." : "Buscar"}
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs="auto">
          <Table bordered responsive className="text-center" style={{ minWidth: "900px" }}>
            <thead>
              <tr>
                {columnas.map((col, i) => (
                  <th key={i}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resultados.length > 0 ? (
                resultados.map((item) => (
                  <tr key={item.id_Estudiante}>
                    <td>{item.id_Estudiante}</td>
                    <td>{item.id_Persona}</td>
                    <td>{item.fecha_Creacion ? new Date(item.fecha_Creacion).toLocaleString() : ""}</td>
                    <td>{item.fecha_Modificacion ? new Date(item.fecha_Modificacion).toLocaleString() : ""}</td>
                    <td>{item.id_Creador}</td>
                    <td>{item.id_Modificador}</td>
                    <td>{item.id_Estado}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  {columnas.map((_, i) => (
                    <td key={i}>&nbsp;</td>
                  ))}
                </tr>
              )}
            </tbody>
          </Table>

          {error && (
            <div className="text-center text-danger mt-2">
              {error}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
