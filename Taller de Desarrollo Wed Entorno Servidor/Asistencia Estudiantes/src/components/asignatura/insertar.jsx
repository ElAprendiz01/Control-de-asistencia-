import { useState } from "react";
import axios from "axios";
const appsettings = {
  apiUrl: import.meta.env.VITE_API_URL
};
import Swal from "sweetalert2";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

// 🔐 Interceptor global para enviar el token automáticamente
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const initialAsignatura = {
  Id_Asignatura: 0,
  Nombre_Asignatura: "",
  Id_Estado: 0,
};

export default function InsertarAsignatura() {
  const [asignaturas, setAsignaturas] = useState(initialAsignatura);

  const inputChangeValue = (event) => {
    const { name, value } = event.target;
    setAsignaturas({ ...asignaturas, [name]: value });
  };

  console.log("API base URL:", appsettings.apiUrl);
  console.log("Token:", localStorage.getItem("access_token"));


  const guardar = async () => {
  try {
    await axios.post(
  "https://localhost:44325/api/Cls_Asignaturas/INSERTAR_ASIGNATURAS",
  asignaturas,
  {
    headers: { "Content-Type": "application/json" }
  }
);


    await Swal.fire({
      icon: "success",
      title: "Asignatura insertada",
      text: "La asignatura se guardó correctamente.",
      timer: 2000,
      showConfirmButton: false,
    });

    setAsignaturas(initialAsignatura);
  } catch (error) {
  console.error("Error al guardar asignatura:", error);
  Swal.fire({
    title: "Error",
    text: "No se pudo guardar la asignatura.",
    icon: "error",
  });
}};


  return (
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h4>Nueva Asignatura</h4>
          <hr />
          <Form>
            <FormGroup>
              <Label>Nombre Asignatura:</Label>
              <Input
                type="text"
                name="Nombre_Asignatura"
                onChange={inputChangeValue}
                value={asignaturas.Nombre_Asignatura}
              />
            </FormGroup>

            <FormGroup>
              <Label>Id Estado:</Label>
              <Input
                type="number"
                name="Id_Estado"
                onChange={inputChangeValue}
                value={asignaturas.Id_Estado}
              />
            </FormGroup>
          </Form>

          <Button color="primary" className="me-4" onClick={guardar}>
            Guardar
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
