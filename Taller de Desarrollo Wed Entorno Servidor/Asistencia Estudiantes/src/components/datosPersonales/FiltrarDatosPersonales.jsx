// src/components/datosPersonales/FiltrarDatosPersonales.jsx
import React, { useState } from "react";
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
import axios from "axios";

const columnas = ["ID", "Nombres", "Apellidos", "Edad", "Género"];

const FiltrarDatosPersonales = () => {
  const [texto, setTexto] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const esNumero = (valor) => /^\d+$/.test(valor.trim());
  const validarTexto = (valor) => /^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ]{1,50}$/.test(valor.trim());

  const buscar = async () => {
    const valor = texto.trim();

    if (!valor) {
      setError("Ingrese un ID o un nombre para buscar.");
      setResultados([]);
      return;
    }

    if (!esNumero(valor) && !validarTexto(valor)) {
      setError("Solo letras, números y espacios. Máximo 50 caracteres.");
      setResultados([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let res;

      if (esNumero(valor)) {
        // Buscar por ID
        res = await axios.get(
          `https://localhost:44325/api/Tbl_Datos_Personales/BUSCAR_DATOS_PERSONALES_ID?IdPersona=${valor}`,
          {
            headers: { DNI: "1" },
          }
        );
      } else {
        // Buscar por nombre o apellido
        res = await axios.get(
          `https://localhost:44325/api/Tbl_Datos_Personales/BUSCAR_DATOS_PERSONALES?Apellido1=${valor}`,
          {
            headers: { DNI: "1" },
          }
        );
      }

      const arr = Array.isArray(res.data) ? res.data : [res.data];

      if (!arr.length || !arr[0].id_Persona) {
        setResultados([]);
        setError("No se encontraron datos.");
      } else {
        setResultados(arr);
      }
    } catch (err) {
      setError("Error al consultar los datos: " + err.message);
      setResultados([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mb-3">
        <Col sm="auto" className="text-center">
          <h5>Buscar Persona por ID o Nombre</h5>
        </Col>
      </Row>

      <Row className="justify-content-center mb-4">
        <Col sm="auto">
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormGroup className="d-flex align-items-center gap-2">
              <Input
                type="text"
                maxLength={50}
                placeholder="ID o Nombre / Apellido"
                style={{ width: "300px" }}
                value={texto}
                onChange={(e) => {
                  setTexto(e.target.value);
                  setError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") buscar();
                }}
              />
              <Button color="primary" onClick={buscar} disabled={loading}>
                {loading ? "Buscando..." : "Buscar"}
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs="auto">
          <Table bordered responsive className="text-center" style={{ minWidth: "700px" }}>
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
};

export default FiltrarDatosPersonales;
