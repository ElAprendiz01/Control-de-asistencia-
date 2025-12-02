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

export default function ActualizarEstudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [estudianteActual, setEstudianteActual] = useState(null);

  const obtenerEstudiantes = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44325/api/Tbl_Estudiantes/OBTENER_ESTUDIANTES"
      );
      setEstudiantes(response.data);
    } catch (error) {
      console.error("Error al cargar estudiantes:", error);
      Swal.fire("Error", "No se pudieron cargar los estudiantes.", "error");
    }
  };

  useEffect(() => {
    obtenerEstudiantes();
  }, []);

  const abrirModal = (estudiante) => {
    setEstudianteActual({ ...estudiante });
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setTimeout(() => setEstudianteActual(null), 300);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEstudianteActual((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuardarCambios = async () => {
    if (!estudianteActual) return;

    try {
      const payload = {
        Id_Estudiante: estudianteActual.id_Estudiante,
        Id_Persona: estudianteActual.id_Persona,
        Fecha_Creacion: estudianteActual.fecha_Creacion,
        Fecha_Modificacion: new Date().toISOString(),
        Id_Creador: estudianteActual.id_Creador ?? 1,
        Id_Modificador: 1,
        Id_Estado: estudianteActual.id_Estado,
      };

      await axios.put(
        "https://localhost:44325/api/Tbl_Estudiantes/ACTUALIZAR_ESTUDIANTE",
        payload
      );

      cerrarModal();
      Swal.fire("¡Actualizado!", "Estudiante actualizado correctamente.", "success");
      obtenerEstudiantes();
    } catch (error) {
      console.error("Error al actualizar estudiante:", error);
      Swal.fire("Error", "No se pudo actualizar el estudiante.", "error");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Lista de Estudiantes</h3>
      <Table bordered hover responsive className="mt-4">
        <thead className="table-dark">
          <tr>
            <th>ID Estudiante</th>
            <th>ID Persona</th>
            <th>Fecha Creación</th>
            <th>Fecha Modificación</th>
            <th>ID Creador</th>
            <th>ID Modificador</th>
            <th>ID Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((est) => (
            <tr key={est.id_Estudiante}>
              <td>{est.id_Estudiante}</td>
              <td>{est.id_Persona}</td>
              <td>{est.fecha_Creacion}</td>
              <td>{est.fecha_Modificacion}</td>
              <td>{est.id_Creador}</td>
              <td>{est.id_Modificador}</td>
              <td>{est.id_Estado}</td>
              <td>
                <Button color="primary" onClick={() => abrirModal(est)}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        isOpen={modalVisible && estudianteActual !== null}
        toggle={cerrarModal}
        fade={false}
      >
        {estudianteActual && (
          <>
            <ModalHeader toggle={cerrarModal}>
              Editando Estudiante ID: {estudianteActual.id_Estudiante}
            </ModalHeader>

            <ModalBody>
              <FormGroup>
                <Label for="id_Persona">ID Persona</Label>
                <Input
                  id="id_Persona"
                  name="id_Persona"
                  type="number"
                  value={estudianteActual.id_Persona}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="id_Estado">ID Estado</Label>
                <Input
                  id="id_Estado"
                  name="id_Estado"
                  type="number"
                  value={estudianteActual.id_Estado}
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
