// src/components/EstudiantesRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import InsertarEstudiante from './estudiantes/insertar';
import ListarEstudiantes from './estudiantes/listar';
import ActualizarEstudiante from './estudiantes/actualizar';
import FiltrarEstudiantes from './estudiantes/filtrar';
import FiltrarEstudianteID from './estudiantes/filtrarID';

const EstudiantesRoutes = () => {
  return (
    <Routes>
      <Route path="insertar" element={<InsertarEstudiante />} />
      <Route path="listar" element={<ListarEstudiantes />} />
      <Route path="actualizar" element={<ActualizarEstudiante />} />
      <Route path="filtrar" element={<FiltrarEstudiantes />} />
      <Route path="filtrarID" element={<FiltrarEstudianteID />} />
    </Routes>
  );
};

export default EstudiantesRoutes;
