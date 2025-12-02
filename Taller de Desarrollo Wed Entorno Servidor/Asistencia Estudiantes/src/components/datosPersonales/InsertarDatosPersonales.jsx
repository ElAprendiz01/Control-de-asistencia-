import React, { useState } from "react";
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

const initialDatosPersonales = {
  primer_Nombre: "",
  segundo_Nombre: "",
  primer_Apellido: "",
  segundo_Apellido: "",
  fecha_Nacimiento: "",
  genero: "",
  id_Creador: 1,
  id_Modificador: 1,
  id_Estado: 1,
};

export default function InsertarDatosPersonales() {
  const [datosPersonales, setDatosPersonales] = useState(initialDatosPersonales);

  const inputChangeValue = (event) => {
    const { name, value } = event.target;
    setDatosPersonales({
      ...datosPersonales,
      [name]: value,
    });
  };

  const guardar = async () => {
    // Validaciones simples (puedes ampliar según tus reglas)
    if (
      !datosPersonales.primer_Nombre ||
      !datosPersonales.primer_Apellido ||
      !datosPersonales.fecha_Nacimiento ||
      !datosPersonales.genero
    ) {
      return Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Los campos Nombre, Apellido, Fecha de Nacimiento y Género son obligatorios",
      });
    }

    try {
      await axios.post(
        "https://localhost:44325/api/Tbl_Datos_Personales/INSERTAR",
        datosPersonales
      );

      await Swal.fire({
        icon: "success",
        title: "Datos insertados",
        text: "Los datos personales se guardaron correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });

      setDatosPersonales(initialDatosPersonales);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudieron guardar los datos personales.",
        icon: "error",
      });
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <h4 className="mb-3">Insertar Datos Personales</h4>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              guardar();
            }}
          >
            <Row>
              <Col md={6}>
                <FormGroup className="mb-2">
                  <Label>Primer Nombre</Label>
                  <Input
                    type="text"
                    name="primer_Nombre"
                    placeholder="Primer Nombre"
                    value={datosPersonales.primer_Nombre}
                    onChange={inputChangeValue}
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <Label>Segundo Nombre</Label>
                  <Input
                    type="text"
                    name="segundo_Nombre"
                    placeholder="Segundo Nombre"
                    value={datosPersonales.segundo_Nombre}
                    onChange={inputChangeValue}
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <Label>Primer Apellido</Label>
                  <Input
                    type="text"
                    name="primer_Apellido"
                    placeholder="Primer Apellido"
                    value={datosPersonales.primer_Apellido}
                    onChange={inputChangeValue}
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <Label>Segundo Apellido</Label>
                  <Input
                    type="text"
                    name="segundo_Apellido"
                    placeholder="Segundo Apellido"
                    value={datosPersonales.segundo_Apellido}
                    onChange={inputChangeValue}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className="mb-2">
                  <Label>Fecha de Nacimiento</Label>
                  <Input
                    type="date"
                    name="fecha_Nacimiento"
                    value={datosPersonales.fecha_Nacimiento}
                    onChange={inputChangeValue}
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <Label>Género</Label>
                  <Input
                    type="select"
                    name="genero"
                    value={datosPersonales.genero}
                    onChange={inputChangeValue}
                  >
                    <option value="">Seleccione</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="O">Otro</option>
                  </Input>
                </FormGroup>
                {/* Campos ocultos o de configuración */}
                <FormGroup className="mb-2">
                  <Label>Id Creador</Label>
                  <Input
                    type="number"
                    name="id_Creador"
                    value={datosPersonales.id_Creador}
                    onChange={inputChangeValue}
                    readOnly
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <Label>Id Modificador</Label>
                  <Input
                    type="number"
                    name="id_Modificador"
                    value={datosPersonales.id_Modificador}
                    onChange={inputChangeValue}
                    readOnly
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <Label>Id Estado</Label>
                  <Input
                    type="number"
                    name="id_Estado"
                    value={datosPersonales.id_Estado}
                    onChange={inputChangeValue}
                    readOnly
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className="d-flex justify-content-end mt-3">
              <Button color="primary" type="submit">
                Guardar
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
