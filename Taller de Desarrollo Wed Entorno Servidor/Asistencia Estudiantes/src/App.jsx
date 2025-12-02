import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Button
} from "reactstrap";

// COMPONENTES PROTEGIDOS Y LOGIN
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Registro from "./components/Registro";

// COMPONENTES ASIGNATURA
import InsertarAsignatura from "./components/asignatura/insertar";
import ListarAsignatura from "./components/asignatura/listar";
import ActualizarAsignatura from "./components/asignatura/actualizar";
import FiltrarAsignatura from "./components/asignatura/filtrar";
import FiltrarIDAsignatura from "./components/asignatura/filtrarID";

// COMPONENTES ASISTENCIA
import InsertarAsistencia from "./components/asistencia/insertarAS";
import ListardAsistencias from "./components/asistencia/listarAS";
import ActualizarAsistencias from "./components/asistencia/actualizarAS";
import FiltrarAsistencias from "./components/asistencia/filtrarAS";

// COMPONENTES ESTUDIANTES
import InsertarEstudiante from "./components/estudiantes/insertar";
import ListarEstudiantes from "./components/estudiantes/listar";
import ActualizarEstudiante from "./components/estudiantes/actualizar";
import FiltrarEstudiantes from "./components/estudiantes/filtrar";
import FiltrarEstudianteID from "./components/estudiantes/filtrarID";

// COMPONENTE DATOS PERSONALES
import DatosPersonalesRoutes from "./components/datosPersonales/DatosPersonalesRoutes";

// COMPONENTE PARA CERRAR SESIÓN
function CerrarSesionButton() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <Button color="danger" size="sm" onClick={cerrarSesion}>
      Cerrar Sesión
    </Button>
  );
}

// COMPONENTE LOGIN
function LoginPage() {
  return (
    <Container className="mt-5" style={{ maxWidth: 400 }}>
      <Login />
      <div className="text-center mt-3">
        ¿No tienes una cuenta?{" "}
        <Link to="/registro">
          <Button color="link" size="sm">Regístrate aquí</Button>
        </Link>
      </div>
    </Container>
  );
}

// COMPONENTE HOME CON NAVBAR
function Home() {
  const usuario = localStorage.getItem("usuario");

  return (
    <>
      <Navbar color="dark" dark expand="md">
        <Container>
          <NavbarBrand tag={Link} to="/">Inicio</NavbarBrand>
          
          {usuario && (
            <div className="d-flex align-items-center gap-2" style={{ marginLeft: "auto" }}>
              <span style={{ color: "white", fontWeight: "bold" }}>Usuario: {usuario}</span>
              <CerrarSesionButton />
            </div>
          )}
        </Container>
      </Navbar>

      <Container className="mt-5 text-center">
        <h1>Asistencia de Estudiantes</h1>
        <p>Selecciona una sección:</p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/asignaturas/insertar">
            <Button color="primary">Asignaturas</Button>
          </Link>
          <Link to="/asistencia/insertarAS">
            <Button color="success">Asistencia</Button>
          </Link>
          <Link to="/estudiantes/insertar">
            <Button color="warning">Estudiantes</Button>
          </Link>
          <Link to="/datospersonales/insertar">
            <Button color="secondary">Datos Personales</Button>
          </Link>
        </div>
      </Container>
    </>
  );
}

// RUTAS ASIGNATURAS
function AsignaturasRoutes() {
  const usuario = localStorage.getItem("usuario");

  return (
    <>
      <Navbar color="dark" dark expand="md">
        <Container>
          <NavbarBrand tag={Link} to="/asignaturas/insertar">Asignaturas
          {usuario && (
            <div className="d-flex align-items-center gap-2" style={{ marginLeft: "auto" }}>
              <span style={{ color: "white", fontWeight: "bold" }}>Usuario: {usuario}</span>
              
            </div>
          )}</NavbarBrand>
          <Nav className="me-auto" navbar>
            <NavItem><NavLink tag={Link} to="/asignaturas/insertar">Insertar</NavLink></NavItem>
            <NavItem><NavLink tag={Link} to="/asignaturas/listar">Listar</NavLink></NavItem>
            <NavItem><NavLink tag={Link} to="/asignaturas/actualizar">Actualizar</NavLink></NavItem>
            <NavItem><NavLink tag={Link} to="/asignaturas/filtrar">Filtrar</NavLink></NavItem>
            <NavItem><NavLink tag={Link} to="/asignaturas/filtrarid">Filtrar por ID</NavLink></NavItem>
          </Nav>
          
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Link to="/home"><Button color="secondary" className="mb-3">Volver al Inicio</Button></Link>
        <Routes>
          <Route path="insertar" element={<InsertarAsignatura />} />
          <Route path="listar" element={<ListarAsignatura />} />
          <Route path="actualizar" element={<ActualizarAsignatura />} />
          <Route path="filtrar" element={<FiltrarAsignatura />} />
          <Route path="filtrarid" element={<FiltrarIDAsignatura />} />
        </Routes>
      </Container>
    </>
  );
}

// RUTAS ASISTENCIA
function AsistenciaRoutes() {
  const usuario = localStorage.getItem("usuario");

  return (
    <>
      <Navbar color="dark" dark expand="md">
        <Container>
          <NavbarBrand tag={Link} to="/asistencia/insertarAS">Asistencia
          {usuario && (
            <div className="d-flex align-items-center gap-2" style={{ marginLeft: "auto" }}>
              <span style={{ color: "white", fontWeight: "bold" }}>Usuario: {usuario}</span>
            
            </div>
          )}</NavbarBrand>
          <Nav className="me-auto" navbar>
            <NavItem><NavLink tag={Link} to="/asistencia/insertarAS">Insertar</NavLink></NavItem>
            <NavItem><NavLink tag={Link} to="/asistencia/listarAS">Listar</NavLink></NavItem>
            <NavItem><NavLink tag={Link} to="/asistencia/actualizarAS">Actualizar</NavLink></NavItem>
            <NavItem><NavLink tag={Link} to="/asistencia/filtrarAS">filtrar</NavLink></NavItem>
          </Nav>
          
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Link to="/home"><Button color="secondary" className="mb-3">Volver al Inicio</Button></Link>
        <Routes>
          <Route path="insertarAS" element={<InsertarAsistencia />} />
          <Route path="listarAS" element={<ListardAsistencias />} />
          <Route path="actualizarAS" element={<ActualizarAsistencias />} />
          <Route path="filtrarAS" element={<FiltrarAsistencias />} />
        </Routes>
      </Container>
    </>
  );
}

// RUTAS ESTUDIANTES
function EstudiantesRoutes() {
  const usuario = localStorage.getItem("usuario");

  return (
    <>
      <Navbar color="dark" dark expand="md">
        <Container>
          <NavbarBrand tag={Link} to="/estudiantes/insertar">Estudiantes
          {usuario && (
            <div className="d-flex align-items-center gap-2" style={{ marginLeft: "auto" }}>
              <span style={{ color: "white", fontWeight: "bold" }}>Usuario: {usuario}</span>
             
            </div>
          )}</NavbarBrand>
          <Nav className="me-auto" navbar>
            <NavItem><NavLink tag={Link} to="/estudiantes/insertar">Insertar</NavLink></NavItem>
            <NavItem><NavLink tag={Link} to="/estudiantes/listar">Listar</NavLink></NavItem>
            <NavItem><NavLink tag={Link} to="/estudiantes/actualizar">Actualizar</NavLink></NavItem>
            <NavItem><NavLink tag={Link} to="/estudiantes/filtrar">Filtrar</NavLink></NavItem>
            <NavItem><NavLink tag={Link} to="/estudiantes/filtrarid">Filtrar por ID</NavLink></NavItem>
          </Nav>
          
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Link to="/home"><Button color="secondary" className="mb-3">Volver al Inicio</Button></Link>
        <Routes>
          <Route path="insertar" element={<InsertarEstudiante />} />
          <Route path="listar" element={<ListarEstudiantes />} />
          <Route path="actualizar" element={<ActualizarEstudiante />} />
          <Route path="filtrar" element={<FiltrarEstudiantes />} />
          <Route path="filtrarid" element={<FiltrarEstudianteID />} />
        </Routes>
      </Container>
    </>
  );
}

// APP PRINCIPAL
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login"replace/>} /> {/* 👈 Login en la raíz */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<Registro />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/asignaturas/*"
          element={
            <ProtectedRoute>
              <AsignaturasRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/asistencia/*"
          element={
            <ProtectedRoute>
              <AsistenciaRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/estudiantes/*"
          element={
            <ProtectedRoute>
              <EstudiantesRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/datospersonales/*"
          element={
            <ProtectedRoute>
              <DatosPersonalesRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;