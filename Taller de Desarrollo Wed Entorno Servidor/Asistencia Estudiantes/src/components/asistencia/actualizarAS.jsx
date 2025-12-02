import React, { useEffect, useState } from "react";
import axios from "../utilidades/axiosConfig"; // O usa axios directamente si no tienes config
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

// 🔐 Interceptor global para enviar el token automáticamente
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function ActualizarAsistencias() {
  const [asistencias, setAsistencias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [asistenciaActual, setAsistenciaActual] = useState(null);

  // 🧠 Cargar asistencias
  const obtenerAsistencias = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44325/api/Tbl_Asistencias/OBTENER_ASISTENCIAS"
      );
      setAsistencias(response.data);
    } catch (error) {
      console.error("Error al cargar asistencias:", error);
      Swal.fire("Error", "No se pudieron cargar las asistencias.", "error");
    }
  };

  useEffect(() => {
    obtenerAsistencias();
  }, []);

  // 🎯 Control del modal
  const abrirModal = (asistencia) => {
    setAsistenciaActual({ ...asistencia });
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setTimeout(() => setAsistenciaActual(null), 300);
  };

  // Manejo de inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAsistenciaActual((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Guardar cambios (actualizar asistencia)
  const handleGuardarCambios = async () => {
    if (!asistenciaActual) return;

    try {
      const payload = {
        Id_Asistencia: asistenciaActual.id_Asistencia,
        Id_Estudiante_Grupo: asistenciaActual.id_Estudiante_Grupo,
        Id_Grupo_Asignatura: asistenciaActual.id_Grupo_Asignatura,
        Id_Docente_Grupo: asistenciaActual.id_Docente_Grupo,
        Fecha: asistenciaActual.fecha,
        Asistio: asistenciaActual.asistio,
        Observacion: asistenciaActual.observacion,
        Id_Creador: asistenciaActual.id_Creador,
        Id_Estado: asistenciaActual.id_Estado,
        // Puedes agregar más campos si tu backend lo requiere
      };

      const response = await axios.put(
        "https://localhost:44325/api/Tbl_Asistencias/ACTUALIZAR_ASISTENCIA",
        payload
      );

      cerrarModal();

      Swal.fire(
        "¡Actualizado!",
        response.data.mensaje || "Asistencia actualizada correctamente.",
        "success"
      );

      obtenerAsistencias();
    } catch (error) {
      console.error("Error al actualizar:", error);
      Swal.fire("Error", "No se pudo actualizar la asistencia.", "error");
    }
  };

  // 🖥️ Render
  return (
    <div className="container mt-5">
      <h3>Panel de Edición de Asistencias</h3>
      <Table bordered hover responsive className="mt-4">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>ID Estudiante Grupo</th>
            <th>ID Grupo Asignatura</th>
            <th>ID Docente Grupo</th>
            <th>Fecha</th>
            <th>Asistió</th>
            <th>Observación</th>
            <th>ID Creador</th>
            <th>ID Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asistencias.map((asistencia) => (
            <tr key={asistencia.id_Asistencia}>
              <td>{asistencia.id_Asistencia}</td>
              <td>{asistencia.id_Estudiante_Grupo}</td>
              <td>{asistencia.id_Grupo_Asignatura}</td>
              <td>{asistencia.id_Docente_Grupo}</td>
              <td>{asistencia.fecha}</td>
              <td>{asistencia.asistio}</td>
              <td>{asistencia.observacion}</td>
              <td>{asistencia.id_Creador}</td>
              <td>{asistencia.id_Estado}</td>
              <td>
                <Button color="primary" onClick={() => abrirModal(asistencia)}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para editar asistencia */}
      {asistenciaActual && (
        <Modal
          isOpen={modalVisible && asistenciaActual !== null}
          toggle={cerrarModal}
          fade={false}
        >
          <ModalHeader toggle={cerrarModal}>
            Editando Asistencia ID: {asistenciaActual.id_Asistencia}
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <Label for="id_Estudiante_Grupo">ID Estudiante Grupo</Label>
              <Input
                id="id_Estudiante_Grupo"
                name="id_Estudiante_Grupo"
                type="number"
                value={asistenciaActual.id_Estudiante_Grupo}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="id_Grupo_Asignatura">ID Grupo Asignatura</Label>
              <Input
                id="id_Grupo_Asignatura"
                name="id_Grupo_Asignatura"
                type="number"
                value={asistenciaActual.id_Grupo_Asignatura}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="id_Docente_Grupo">ID Docente Grupo</Label>
              <Input
                id="id_Docente_Grupo"
                name="id_Docente_Grupo"
                type="number"
                value={asistenciaActual.id_Docente_Grupo}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="fecha">Fecha</Label>
              <Input
                id="fecha"
                name="fecha"
                type="date"
                value={asistenciaActual.fecha}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="asistio">Asistió</Label>
              <Input
                id="asistio"
                name="asistio"
                type="text"
                value={asistenciaActual.asistio}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="observacion">Observación</Label>
              <Input
                id="observacion"
                name="observacion"
                type="text"
                value={asistenciaActual.observacion}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="id_Creador">ID Creador</Label>
              <Input
                id="id_Creador"
                name="id_Creador"
                type="number"
                value={asistenciaActual.id_Creador}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="id_Estado">ID Estado</Label>
              <Input
                id="id_Estado"
                name="id_Estado"
                type="number"
                value={asistenciaActual.id_Estado}
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
        </Modal>
      )}
    </div>
  );
}
