import { useState } from "react";
import axios from "axios";
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
import { appsettings } from "../settings/appsettings";

// Inicializar objeto asistencia
const initialAsistencia = {
  id_Asistencia: 0,
  id_Estudiante_Grupo: 0,
  id_Grupo_Asignatura: 0,
  id_Docente_Grupo: 0,
  fecha: "",
  asistio: "",
  observacion: "",
  Fecha_Creacion: new Date().toISOString(),         // Aseguramos fecha
  Fecha_Modificacion: new Date().toISOString(),     // Aseguramos fecha
  Id_Creador: 1, // puedes poner el ID real del usuario autenticado
  Id_Modificador: 1,
  Id_Estado: 1
};

export default function InsertarAsistencia() {
  const [asistencia, setAsistencia] = useState(initialAsistencia);

  // Manejador de inputs
  const inputChangeValue = (e) => {
    const { name, value } = e.target;
    setAsistencia({ ...asistencia, [name]: value });
  };

  const guardar = async () => {
    try {
      await axios.post(
        `${appsettings.apiUrl}Tbl_Asistencias/INSERTAR_ASISTENCIA`,
        asistencia, // ENVÍA LOS DATOS AQUÍ
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Asistencia insertada",
        text: "La asistencia se guardó correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });

      setAsistencia(initialAsistencia); // Reiniciar formulario
    } catch (error) {
      console.error("Error al guardar:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar la asistencia.",
        icon: "error",
      });
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h4 className="mb-4">Insertar Asistencia</h4>
          <Form>
            <FormGroup>
              <Label>ID Estudiante Grupo</Label>
              <Input
                type="number"
                name="id_Estudiante_Grupo"
                value={asistencia.id_Estudiante_Grupo}
                onChange={inputChangeValue}
              />
            </FormGroup>

            <FormGroup>
              <Label>ID Grupo Asignatura</Label>
              <Input
                type="number"
                name="id_Grupo_Asignatura"
                value={asistencia.id_Grupo_Asignatura}
                onChange={inputChangeValue}
              />
            </FormGroup>

            <FormGroup>
              <Label>ID Docente Grupo</Label>
              <Input
                type="number"
                name="id_Docente_Grupo"
                value={asistencia.id_Docente_Grupo}
                onChange={inputChangeValue}
              />
            </FormGroup>

            <FormGroup>
              <Label>Fecha</Label>
              <Input
                type="date"
                name="fecha"
                value={asistencia.fecha}
                onChange={inputChangeValue}
              />
            </FormGroup>

            <FormGroup>
              <Label>Asistió</Label>
              <Input
                type="text"
                name="asistio"
                value={asistencia.asistio}
                onChange={inputChangeValue}
                placeholder='Ejemplo: "sí" o "no"'
              />
            </FormGroup>

            <FormGroup>
              <Label>Observación</Label>
              <Input
                type="text"
                name="observacion"
                value={asistencia.observacion}
                onChange={inputChangeValue}
              />
            </FormGroup>

           
            <Button color="primary" onClick={guardar}>
              Guardar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
