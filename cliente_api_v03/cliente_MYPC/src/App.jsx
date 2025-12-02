import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { Navigate } from 'react-router-dom';
import InsertarEstado from './pages/Estado/InsertarEstado';
import ActualizarEstado from './pages/Estado/ActualizarEstado';
import FiltrarPorNombre from './pages/Estado/FiltrarPorNombre';
import EstadoPorId from './pages/Estado/EstadoPorId';
import ListarTodos from './pages/Estado/ListarTodos';
import EstadoOpciones from './pages/Estado/estadoOpciones';
import InsertarTipoCatalogo from './pages/TipoCatalogo/InsertarTipoCatalogo';
import ActualizarTipoCatalogo from './pages/TipoCatalogo/ActualizarTipoCatalogo';
import FiltrarTipoCatalogoPorNombre from './pages/TipoCatalogo/FiltrarTipoCatalogoPorNombre';
import TipoCatalogoPorId from './pages/TipoCatalogo/TipoCatalogoPorId';
import ListarTipoCatalogos from './pages/TipoCatalogo/ListarTipoCatalogos';
import TipoCatalogoOpciones from './pages/TipoCatalogo/TipoCatalogoOpciones';
// Catálogo
import CatalogoOpciones from './pages/Catalogo/CatalogoOpciones';
import InsertarCatalogo from './pages/Catalogo/InsertarCatalogo';
import ActualizarCatalogo from './pages/Catalogo/ActualizarCatalogo';
import FiltrarCatalogoPorNombre from './pages/Catalogo/FiltrarCatalogoPorNombre';
import CatalogoPorId from './pages/Catalogo/CatalogoPorId';
import ListarCatalogos from './pages/Catalogo/ListarCatalogos';

// Datos Personales
import DatosPersonalesOpciones from './pages/DatosPersonales/DatosPersonalesOpciones';
import InsertarDatosPersonales from './pages/DatosPersonales/InsertarDatosPersonales';
import ActualizarDatosPersonales from './pages/DatosPersonales/ActualizarDatosPersonales';
import FiltrarDatosPersonalesPorNombre from './pages/DatosPersonales/FiltrarDatosPersonalesPorNombre';
import DatosPersonalesPorId from './pages/DatosPersonales/DatosPersonalesPorId';
import ListarDatosPersonales from './pages/DatosPersonales/ListarDatosPersonaless';

import ContactoOpciones from './pages/Contacto/ContactoOpciones';
import InsertarContacto from './pages/Contacto/InsertarContacto';
import ActualizarContacto from './pages/Contacto/ActualizarContacto';
import FiltrarContactoPorNombre from './pages/Contacto/FiltrarContactoPorNombre';
import ContactoPorId from './pages/Contacto/ContactoPorId';
import ListarContactos from './pages/Contacto/ListarContactos';

import ContratoOpciones from './pages/Contrato/ContratoOpciones';
import InsertarContrato from './pages/Contrato/InsertarContrato';
import ActualizarContrato from './pages/Contrato/ActualizarContrato';
import ContratoPorId from './pages/Contrato/ContratoPorId';
import ContratoPorPersona from './pages/Contrato/FiltrarContratoPorNombre';
import ListarContratos from './pages/Contrato/ListarContratos';
/*
// Direcciones
import DireccionesOpciones from './pages/Direcciones/DireccionesOpciones';
import InsertarDireccion from './pages/Direcciones/InsertarDireccion';
import ActualizarDireccion from './pages/Direcciones/ActualizarDireccion';
import FiltrarDireccionPorNombre from './pages/Direcciones/FiltrarDireccionPorNombre';
import DireccionPorId from './pages/Direcciones/DireccionPorId';
import ListarDirecciones from './pages/Direcciones/ListarDirecciones';

// Departamento
import DepartamentoOpciones from './pages/Departamento/DepartamentoOpciones';
import InsertarDepartamento from './pages/Departamento/InsertarDepartamento';
import ActualizarDepartamento from './pages/Departamento/ActualizarDepartamento';
import FiltrarDepartamentoPorNombre from './pages/Departamento/FiltrarDepartamentoPorNombre';
import DepartamentoPorId from './pages/Departamento/DepartamentoPorId';
import ListarDepartamentos from './pages/Departamento/ListarDepartamentos';

// Puesto
import PuestoOpciones from './pages/Puesto/PuestoOpciones';
import InsertarPuesto from './pages/Puesto/InsertarPuesto';
import ActualizarPuesto from './pages/Puesto/ActualizarPuesto';
import FiltrarPuestoPorNombre from './pages/Puesto/FiltrarPuestoPorNombre';
import PuestoPorId from './pages/Puesto/PuestoPorId';
import ListarPuestos from './pages/Puesto/ListarPuestos';

// Gestión Personal
import GestionPersonalOpciones from './pages/GestionPersonal/GestionPersonalOpciones';
import InsertarGestionPersonal from './pages/GestionPersonal/InsertarGestionPersonal';
import ActualizarGestionPersonal from './pages/GestionPersonal/ActualizarGestionPersonal';
import FiltrarGestionPersonalPorNombre from './pages/GestionPersonal/FiltrarGestionPersonalPorNombre';
import GestionPersonalPorId from './pages/GestionPersonal/GestionPersonalPorId';
import ListarGestionPersonal from './pages/GestionPersonal/ListarGestionPersonal';

// Contrato
import ContratoOpciones from './pages/Contrato/ContratoOpciones';
import InsertarContrato from './pages/Contrato/InsertarContrato';
import ActualizarContrato from './pages/Contrato/ActualizarContrato';
import FiltrarContratoPorNombre from './pages/Contrato/FiltrarContratoPorNombre';
import ContratoPorId from './pages/Contrato/ContratoPorId';
import ListarContratos from './pages/Contrato/ListarContratos';

// Proveedores
import ProveedoresOpciones from './pages/Proveedores/ProveedoresOpciones';
import InsertarProveedor from './pages/Proveedores/InsertarProveedor';
import ActualizarProveedor from './pages/Proveedores/ActualizarProveedor';
import FiltrarProveedorPorNombre from './pages/Proveedores/FiltrarProveedorPorNombre';
import ProveedorPorId from './pages/Proveedores/ProveedorPorId';
import ListarProveedores from './pages/Proveedores/ListarProveedores';

// Producto
import ProductoOpciones from './pages/Producto/ProductoOpciones';
import InsertarProducto from './pages/Producto/InsertarProducto';
import ActualizarProducto from './pages/Producto/ActualizarProducto';
import FiltrarProductoPorNombre from './pages/Producto/FiltrarProductoPorNombre';
import ProductoPorId from './pages/Producto/ProductoPorId';
import ListarProductos from './pages/Producto/ListarProductos';

// Inventario
import InventarioOpciones from './pages/Inventario/InventarioOpciones';
import InsertarInventario from './pages/Inventario/InsertarInventario';
import ActualizarInventario from './pages/Inventario/ActualizarInventario';
import FiltrarInventarioPorNombre from './pages/Inventario/FiltrarInventarioPorNombre';
import InventarioPorId from './pages/Inventario/InventarioPorId';
import ListarInventario from './pages/Inventario/ListarInventario';

// Entrega Activos
import EntregaActivosOpciones from './pages/EntregaActivos/EntregaActivosOpciones';
import InsertarEntregaActivos from './pages/EntregaActivos/InsertarEntregaActivos';
import ActualizarEntregaActivos from './pages/EntregaActivos/ActualizarEntregaActivos';
import FiltrarEntregaActivosPorNombre from './pages/EntregaActivos/FiltrarEntregaActivosPorNombre';
import EntregaActivosPorId from './pages/EntregaActivos/EntregaActivosPorId';
import ListarEntregaActivos from './pages/EntregaActivos/ListarEntregaActivos';

// Entrega Activos Item
import EntregaActivosItemOpciones from './pages/EntregaActivosItem/EntregaActivosItemOpciones';
import InsertarEntregaActivosItem from './pages/EntregaActivosItem/InsertarEntregaActivosItem';
import ActualizarEntregaActivosItem from './pages/EntregaActivosItem/ActualizarEntregaActivosItem';
import FiltrarEntregaActivosItemPorNombre from './pages/EntregaActivosItem/FiltrarEntregaActivosItemPorNombre';
import EntregaActivosItemPorId from './pages/EntregaActivosItem/EntregaActivosItemPorId';
import ListarEntregaActivosItem from './pages/EntregaActivosItem/ListarEntregaActivosItem';

// Activos Asignados
import ActivosAsignadosOpciones from './pages/ActivosAsignados/ActivosAsignadosOpciones';
import InsertarActivosAsignados from './pages/ActivosAsignados/InsertarActivosAsignados';
import ActualizarActivosAsignados from './pages/ActivosAsignados/ActualizarActivosAsignados';
import FiltrarActivosAsignadosPorNombre from './pages/ActivosAsignados/FiltrarActivosAsignadosPorNombre';
import ActivosAsignadosPorId from './pages/ActivosAsignados/ActivosAsignadosPorId';
import ListarActivosAsignados from './pages/ActivosAsignados/ListarActivosAsignados';

// Roles
import RolesOpciones from './pages/Roles/RolesOpciones';
import InsertarRol from './pages/Roles/InsertarRol';
import ActualizarRol from './pages/Roles/ActualizarRol';
import FiltrarRolPorNombre from './pages/Roles/FiltrarRolPorNombre';
import RolPorId from './pages/Roles/RolPorId';
import ListarRoles from './pages/Roles/ListarRoles';

// Usuarios
import UsuariosOpciones from './pages/Usuarios/UsuariosOpciones';
import InsertarUsuario from './pages/Usuarios/InsertarUsuario';
import ActualizarUsuario from './pages/Usuarios/ActualizarUsuario';
import FiltrarUsuarioPorNombre from './pages/Usuarios/FiltrarUsuarioPorNombre';
import UsuarioPorId from './pages/Usuarios/UsuarioPorId';
import ListarUsuarios from './pages/Usuarios/ListarUsuarios';

*/


const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/tablas" element={<Home />} />

      
      <Route path="/tablas/EstadoOpciones" element={<EstadoOpciones />} />
      <Route path="/estado/insertar" element={<InsertarEstado />} />
      <Route path="/estado/actualizar" element={<ActualizarEstado />} />
      <Route path="/estado/filtrar-nombre" element={<FiltrarPorNombre />} />
      <Route path="/estado/por-id" element={<EstadoPorId />} />
      <Route path="/estado/listar-todos" element={<ListarTodos />} />
           {/* TipoCatalogo */}
      <Route path="/tablas/TipoCatalogoOpciones" element={<TipoCatalogoOpciones />} />
      <Route path="/tipo-catalogo/insertar" element={<InsertarTipoCatalogo />} />
      <Route path="/tipo-catalogo/actualizar" element={<ActualizarTipoCatalogo />} />
      <Route path="/tipo-catalogo/filtrar-nombre" element={<FiltrarTipoCatalogoPorNombre />} />
      <Route path="/tipo-catalogo/por-id" element={<TipoCatalogoPorId />} />
      <Route path="/tipo-catalogo/listar" element={<ListarTipoCatalogos />} />
     
     
      <Route path="/tablas/CatalogoOpciones" element={<CatalogoOpciones />} />
      <Route path="/catalogo/insertar" element={<InsertarCatalogo />} />
      <Route path="/catalogo/actualizar" element={<ActualizarCatalogo />} />
      <Route path="/catalogo/filtrar-nombre" element={<FiltrarCatalogoPorNombre />} />
      <Route path="/catalogo/por-id" element={<CatalogoPorId />} />
      <Route path="/catalogo/listar" element={<ListarCatalogos />} />

      
      <Route path="/tablas/DatosPersonalesOpciones" element={<DatosPersonalesOpciones />} />
      <Route path="/datos-personales/insertar" element={<InsertarDatosPersonales />} />
      <Route path="/datos-personales/actualizar" element={<ActualizarDatosPersonales />} />
      <Route path="/datos-personales/filtrar-nombre" element={<FiltrarDatosPersonalesPorNombre />} />
      <Route path="/datos-personales/por-id" element={<DatosPersonalesPorId />} />
      <Route path="/datos-personales/listar" element={<ListarDatosPersonales />} />
      
      <Route path="/tablas/ContactoOpciones" element={<ContactoOpciones />} />
      <Route path="/contacto/insertar" element={<InsertarContacto />} />
      <Route path="/contacto/actualizar" element={<ActualizarContacto />} />
      <Route path="/contacto/filtrar-nombre" element={<FiltrarContactoPorNombre />} />
      <Route path="/contacto/por-id" element={<ContactoPorId />} />
      <Route path="/contacto/listar" element={<ListarContactos />} />

      <Route path="/tablas/ContratoOpciones" element={<ContratoOpciones />} />
      <Route path="/Contrato/insertar" element={<InsertarContrato />} />
      <Route path="/Contrato/actualizar" element={<ActualizarContrato />} />
      <Route path="/Contrato/filtrar-nombre" element={<ContratoPorPersona />} />
      <Route path="/Contrato/por-id" element={<ContratoPorId />} />
      <Route path="/Contrato/listar" element={<ListarContratos />} />

    </Routes>
  );
};

export default App;