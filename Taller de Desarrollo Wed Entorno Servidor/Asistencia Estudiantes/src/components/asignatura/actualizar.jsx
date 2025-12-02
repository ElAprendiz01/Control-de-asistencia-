import React, { useEffect, useState } from "react";
import axios from "../utilidades/axiosConfig";
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

export default function ActualizarAsignaturas() {
  const [asignaturas, setAsignaturas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [asignaturaActual, setAsignaturaActual] = useState(null);

  // 🧠 Cargar asignaturas
  const obtenerAsignaturas = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44325/api/Cls_Asignaturas/OBTENER_ASIGNATURAS"
      );
      setAsignaturas(response.data);
    } catch (error) {
      console.error("Error al cargar asignaturas:", error);
      Swal.fire("Error", "No se pudieron cargar las asignaturas.", "error");
    }
  };

  useEffect(() => {
    obtenerAsignaturas();
  }, []);

  // 🎯 Modal control
  const abrirModal = (asignatura) => {
    setAsignaturaActual({ ...asignatura });
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setTimeout(() => setAsignaturaActual(null), 300);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAsignaturaActual((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuardarCambios = async () => {
    if (!asignaturaActual) return;

    try {
      const payload = {
        Id_Asignatura: asignaturaActual.id_Asignatura,
        Nombre_Asignatura: asignaturaActual.nombre_Asignatura?.trim() || "Sin nombre",
        Id_Estado: asignaturaActual.id_Estado ?? 0,
        // 👇 El backend tomará el ID del usuario desde el token (claim)
      };

      const response = await axios.put(
        "https://localhost:44325/api/Cls_Asignaturas/ACTUALIZAR_ASIGNATURAS",
        payload
      );

      cerrarModal();

      Swal.fire(
        "¡Actualizado!",
        response.data.mensaje || "Asignatura actualizada correctamente.",
        "success"
      );

      obtenerAsignaturas();
    } catch (error) {
      console.error("Error al actualizar:", error);
      Swal.fire("Error", "No se pudo actualizar la asignatura.", "error");
    }
  };

  // 🖥️ Render
  return (
    <div className="container mt-5">
      <h3>Panel de Edición de Asignaturas</h3>
      <Table bordered hover responsive className="mt-4">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre de la Asignatura</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asignaturas.map((asignatura) => (
            <tr key={asignatura.id_Asignatura}>
              <td>{asignatura.id_Asignatura}</td>
              <td>{asignatura.nombre_Asignatura?.trim() || <i>Sin nombre</i>}</td>
              <td>{asignatura.id_Estado}</td>
              <td>
                <Button color="primary" onClick={() => abrirModal(asignatura)}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        isOpen={modalVisible && asignaturaActual !== null}
        toggle={cerrarModal}
        fade={false}
      >
        {asignaturaActual && (
          <div>
            <ModalHeader toggle={cerrarModal}>
              Editando Asignatura:&nbsp;
              {asignaturaActual.nombre_Asignatura?.trim() || "Sin nombre"}
            </ModalHeader>

            <ModalBody>
              <FormGroup>
                <Label for="nombre_Asignatura">Nombre de la Asignatura</Label>
                <Input
                  id="nombre_Asignatura"
                  name="nombre_Asignatura"
                  type="text"
                  value={
                    typeof asignaturaActual.nombre_Asignatura === "string"
                      ? asignaturaActual.nombre_Asignatura
                      : ""
                  }
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="id_Estado">ID Estado</Label>
                <Input
                  id="id_Estado"
                  name="id_Estado"
                  type="number"
                  value={asignaturaActual.id_Estado ?? ""}
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
          </div>
        )}
      </Modal>
    </div>
  );
}
