import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

export default function ActualizarDatosPersonales() {
  const [personas, setPersonas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [personaActual, setPersonaActual] = useState(null);

  const obtenerPersonas = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44325/api/Tbl_Datos_Personales/OBTENER_DATOS_PERSONALES"
      );
      setPersonas(response.data);
    } catch (error) {
      console.error("Error al cargar datos personales:", error);
      Swal.fire("Error", "No se pudieron cargar los datos personales.", "error");
    }
  };

  useEffect(() => {
    obtenerPersonas();
  }, []);

  const abrirModal = (persona) => {
    setPersonaActual({ ...persona });
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setTimeout(() => setPersonaActual(null), 300);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonaActual((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuardarCambios = async () => {
    if (!personaActual) return;

    try {
      const payload = {
        Id_Persona: personaActual.id_Persona,
        Nombres: personaActual.nombres,
        Apellidos: personaActual.apellidos,
        Fecha_Nacimiento: personaActual.fecha_Nacimiento,
        Genero: personaActual.genero,
        Id_Modificador: 1,
        Id_Estado: personaActual.id_Estado ?? 1,
      };

      const response = await axios.put(
        `https://localhost:44325/api/Tbl_Datos_Personales/ACTUALIZAR/${payload.Id_Persona}`,
        payload
      );

      cerrarModal();

      Swal.fire(
        "¡Actualizado!",
        response.data.mensaje || "Datos personales actualizados correctamente.",
        "success"
      );

      obtenerPersonas();
    } catch (error) {
      console.error("Error al actualizar datos personales:", error);
      Swal.fire("Error", "No se pudo actualizar la persona.", "error");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Panel de Edición de Datos Personales</h3>
      <Table bordered hover responsive className="mt-4">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Fecha Nacimiento</th>
            <th>Género</th>
            <th>ID Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((persona) => (
            <tr key={persona.id_Persona}>
              <td>{persona.id_Persona}</td>
              <td>{persona.nombres}</td>
              <td>{persona.apellidos}</td>
              <td>{persona.fecha_Nacimiento}</td>
              <td>{persona.genero}</td>
              <td>{persona.id_Estado}</td>
              <td>
                <Button color="primary" onClick={() => abrirModal(persona)}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        isOpen={modalVisible && personaActual !== null}
        toggle={cerrarModal}
        fade={false}
      >
        {personaActual && (
          <>
            <ModalHeader toggle={cerrarModal}>
              Editando Persona: {personaActual.nombres}
            </ModalHeader>

            <ModalBody>
              <FormGroup>
                <Label for="nombres">Nombres</Label>
                <Input
                  id="nombres"
                  name="nombres"
                  type="text"
                  value={personaActual.nombres || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="apellidos">Apellidos</Label>
                <Input
                  id="apellidos"
                  name="apellidos"
                  type="text"
                  value={personaActual.apellidos || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="fecha_Nacimiento">Fecha de Nacimiento</Label>
                <Input
                  id="fecha_Nacimiento"
                  name="fecha_Nacimiento"
                  type="date"
                  value={personaActual.fecha_Nacimiento?.split("T")[0] || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="genero">Género</Label>
                <Input
                  id="genero"
                  name="genero"
                  type="text"
                  value={personaActual.genero || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="id_Estado">ID Estado</Label>
                <Input
                  id="id_Estado"
                  name="id_Estado"
                  type="number"
                  value={personaActual.id_Estado ?? 1}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <Button color="primary" onClick={handleGuardarCambios}>
                Guardar Cambios
              </Button>
              <Button color="secondary" onClick={cerrarModal}>
                Cancelar
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </div>
  );
}
