import { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
} from "reactstrap";

export default function InsertarEstudiante() {
  const [estudiante, setEstudiante] = useState({
    id_Persona: "",
    id_Creador: "",
    id_Modificador: "",
    id_Estado: "",
  });

  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [loading, setLoading] = useState(false);

  const validarCampo = (valor) => /^[0-9]{1,10}$/.test(valor);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === "" || validarCampo(value)) {
      setEstudiante({ ...estudiante, [name]: value });
      setError(null);
    } else {
      setError("Solo se permiten números. Máximo 10 dígitos.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);

    // Validar todos los campos
    for (let key in estudiante) {
      if (!validarCampo(estudiante[key])) {
        setError("Todos los campos deben contener solo números (máx. 10 dígitos).");
        return;
      }
    }

    setLoading(true);

    try {
      await axios.post("/api/Tbl_Estudiantes/INSERTAR_ESTUDIANTE", estudiante);
      setMensaje("Estudiante insertado correctamente.");
      setEstudiante({
        id_Persona: "",
        id_Creador: "",
        id_Modificador: "",
        id_Estado: "",
      });
    } catch (err) {
      console.error("Error al insertar estudiante:", err);
      setError("Error al insertar estudiante.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mb-3">
        <Col sm="auto" className="text-center">
          <h5>Insertar Estudiante</h5>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col sm="auto">
          <Form onSubmit={handleSubmit}>
            {[
              { label: "ID Persona", name: "id_Persona" },
              { label: "ID Creador", name: "id_Creador" },
              { label: "ID Modificador", name: "id_Modificador" },
              { label: "ID Estado", name: "id_Estado" },
            ].map((field, index) => (
              <FormGroup key={index} className="mb-3">
                <Label>{field.label}</Label>
                <Input
                  type="text"
                  name={field.name}
                  value={estudiante[field.name]}
                  onChange={handleChange}
                  maxLength={10}
                  placeholder={field.label}
                  required
                />
              </FormGroup>
            ))}

            <div className="text-center">
              <Button type="submit" color="primary" disabled={loading}>
                {loading ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </Form>

          {error && <div className="text-danger text-center mt-3">{error}</div>}
          {mensaje && <div className="text-success text-center mt-3">{mensaje}</div>}
        </Col>
      </Row>
    </Container>
  );
}