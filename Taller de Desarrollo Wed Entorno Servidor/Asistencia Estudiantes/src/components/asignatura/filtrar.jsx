import { useState } from "react";
import { appsettings } from "../settings/appsettings";
import { Container, Row, Col, Table, Button, Input } from "reactstrap";

export default function FiltrarAsignatura() {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);

  // 👇 FUNCIÓN CORREGIDA 👇
  const handleBuscar = async () => {
    // Opciones para la solicitud fetch
    const requestOptions = {
      method: 'GET',
      headers: {
        // La clave es enviar el valor de la búsqueda en la cabecera 'NombreAsignatura'
        'NombreAsignatura': busqueda
      }
    };

    try {
      // La URL ya no necesita el parámetro ?busqueda=...
      const res = await fetch(`${appsettings.apiUrl}Cls_Asignaturas/BUSCAR_ASIGNATURAS`, requestOptions);
      
      if (!res.ok) {
        if (res.status === 204) { // El servidor responde 204 si no hay resultados
          setResultados([]);
          setError(null);
          return;
        }
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      setResultados(Array.isArray(data) ? data : []);
      setError(null);

    } catch (error) {
      setResultados([]);
      setError(error.message);
    }
  };

  

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 10, offset: 1 }}>
          <h4>Filtrar Asignaturas (por nombre)</h4>
          <Input
            type="text"
            placeholder="Buscar por nombre..."
            className="mb-3"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <Button color="primary" onClick={handleBuscar}>
            Buscar
          </Button>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          <Table bordered className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Fecha Creación</th>
                <th>Fecha Modificación</th>
                <th>ID Creador</th>
                <th>ID Modificador</th>
                <th>ID Estado</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((item) => (
                <tr key={item.id_Asignatura}>
                  <td>{item.id_Asignatura}</td>
                  <td>{item.nombre_Asignatura}</td>
                  <td>{item.fecha_Creacion}</td>
                  <td>{item.fecha_Modificacion}</td>
                  <td>{item.id_Creador}</td>
                  <td>{item.id_Modificador}</td>
                  <td>{item.id_Estado}</td>
                </tr>
              ))}
              {resultados.length === 0 && !error && (
                <tr>
                  <td colSpan="7" className="text-center">
                    No se encontraron asignaturas. Escribe en el buscador y presiona "Buscar".
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}