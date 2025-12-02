import { useState } from "react";
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
import { appsettings } from "../settings/appsettings";

const columnas = ["ID Persona", "Nombres", "Apellidos", "Edad", "Género", "Fecha Nacimiento"];

export default function FiltrarDatosPersonalesID() {
  const [id, setId] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscarPorID = async () => {
    if (id.trim() === "") {
      setResultados([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${appsettings.apiUrl}Tbl_Datos_Personales/FILTRAR_ID/${id}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );

      if (!res.ok) {
        if (res.status === 404 || res.status === 204) {
          setResultados([]);
          setError("Persona no encontrada.");
        } else {
          throw new Error(`Error al consultar: ${res.statusText}`);
        }
      } else {
        const text = await res.text();
        if (!text) {
          setResultados([]);
          setError("La persona no existe.");
        } else {
          const data = JSON.parse(text);
          setResultados(Array.isArray(data) ? data : [data]);
        }
      }
    } catch (err) {
      setError("Error al consultar: " + err.message);
      setResultados([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="mb-3 justify-content-center">
        <Col sm="auto">
          <h5>Filtrar persona por ID</h5>
        </Col>
      </Row>

      <Row className="mb-3 justify-content-center">
        <Col sm="auto">
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormGroup className="d-flex align-items-center gap-2">
              <Input
                type="text"
                placeholder="ID"
                maxLength={5}
                value={id}
                style={{ width: "100px" }}
                onChange={(e) => {
                  const soloNumeros = e.target.value.replace(/\D/g, "");
                  setId(soloNumeros);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") buscarPorID();
                }}
              />
              <Button color="primary" onClick={buscarPorID} disabled={loading}>
                {loading ? "Buscando..." : "Buscar"}
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>

      {error && (
        <Row className="justify-content-center mb-3">
          <Col sm="auto">
            <div className="alert alert-danger">{error}</div>
          </Col>
        </Row>
      )}

      <Row className="justify-content-center">
        <Col xs="12">
          <Table bordered responsive className="text-center">
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
                  <tr key={item.id_Persona}>
                    <td>{item.id_Persona}</td>
                    <td>{`${item.primer_Nombre || ""} ${item.segundo_Nombre || ""}`.trim()}</td>
                    <td>{`${item.primer_Apellido || ""} ${item.segundo_Apellido || ""}`.trim()}</td>
                    <td>{item.edad}</td>
                    <td>{item.genero}</td>
                    <td>{item.fecha_Nacimiento}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columnas.length}>No hay datos para mostrar.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
