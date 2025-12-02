
using CAPA_ENTIDADES;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_DATOS
{
    public class CD_PERMISOS_ROLES
    {
        private readonly CD_CONEXION _connection;
        DataTable tabla = new DataTable();
        SqlDataAdapter da = new SqlDataAdapter();
        SqlCommand cmd = new SqlCommand();

        public CD_PERMISOS_ROLES(IConfiguration configuration)
        {
            _connection = new CD_CONEXION(configuration);

        }

        #region InsertarPermisosRoles

        public void InsertarPermisosRoles(CE_PERMISOS_ROLES obj, out int resultado, out string mensaje)
        {
            cmd.Connection = _connection.AbrirConexion();
            cmd.CommandText = "SP_Permisos_Roles";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Accion", SqlDbType.Char, 3).Value = "INS";
            cmd.Parameters.Add("@Id_Rol", SqlDbType.Int).Value = obj.Id_Rol;
            cmd.Parameters.Add("@Modulo", SqlDbType.VarChar,50).Value = obj.Modulo;
            cmd.Parameters.Add("@PuedeInsertar", SqlDbType.Bit).Value = obj.PuedeInsertar;
            cmd.Parameters.Add("@PuedeEditar", SqlDbType.Bit).Value = obj.PuedeEditar;
            cmd.Parameters.Add("@PuedeVisualizar", SqlDbType.Bit).Value = obj.PuedeVisualizar;
            cmd.Parameters.Add("@PuedeFiltrarNombre", SqlDbType.Bit).Value = obj.PuedeFiltrarNombre;
            cmd.Parameters.Add("@PuedeFiltrarId", SqlDbType.Bit).Value = obj.PuedeFiltrarId;

            cmd.Parameters.Add("@O_Numero", SqlDbType.Int).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("@O_Msg", SqlDbType.VarChar, 100).Direction = ParameterDirection.Output;

            try
            {
                cmd.ExecuteNonQuery();
                resultado = Convert.ToInt32(cmd.Parameters["@O_numero"].Value);
                mensaje = Convert.ToString(cmd.Parameters["@O_Msg"].Value);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al ingresar gupo Permiso para el Rol: " + ex.Message, ex);
            }
            finally
            {
                cmd.Parameters.Clear();
                cmd.Connection = _connection.CerrarConexion();
            }
        }


        #endregion InsertarPermisosRoles

        #region ActualizarPermisosRoles

        public void ActualizarPermisosRoles(CE_PERMISOS_ROLES obj, out int resultado, out string mensaje)
        {



            cmd.Connection = _connection.AbrirConexion();
            cmd.CommandText = "SP_Permisos_Roles";
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add("@ccion", SqlDbType.Char, 3).Value = "UPD";
            cmd.Parameters.Add("@Id_Permiso", SqlDbType.Int).Value = obj.Id_Permiso ?? (object)DBNull.Value;
            cmd.Parameters.Add("@Id_Rol", SqlDbType.Int).Value = obj.Id_Rol ?? (object)DBNull.Value;
            cmd.Parameters.Add("@Modulo", SqlDbType.VarChar, 50).Value = obj.Modulo ?? (object)DBNull.Value;
            cmd.Parameters.Add("@PuedeInsertar", SqlDbType.Bit).Value = obj.PuedeInsertar ?? (object)DBNull.Value;
            cmd.Parameters.Add("@PuedeEditar", SqlDbType.Bit).Value = obj.PuedeEditar ?? (object)DBNull.Value;
            cmd.Parameters.Add("@PuedeVisualizar", SqlDbType.Bit).Value = obj.PuedeVisualizar ?? (object)DBNull.Value;
            cmd.Parameters.Add("@PuedeFiltrarNombre", SqlDbType.Bit).Value = obj.PuedeFiltrarNombre ?? (object)DBNull.Value;
            cmd.Parameters.Add("@PuedeFiltrarId", SqlDbType.Bit).Value = obj.PuedeFiltrarId ?? (object)DBNull.Value;

            cmd.Parameters.Add("@O_Numero", SqlDbType.Int).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("@O_Msg", SqlDbType.VarChar, 100).Direction = ParameterDirection.Output;


            try
            {
                cmd.ExecuteNonQuery();

                resultado = Convert.ToInt32(cmd.Parameters["@O_Numero"].Value);
                mensaje = Convert.ToString(cmd.Parameters["@O_Msg"].Value);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al ingresar asignatura: " + ex.Message, ex);
            }
            finally
            {
                cmd.Parameters.Clear();
                cmd.Connection = _connection.CerrarConexion();
            }
        }


        #endregion ActualizarPermisosRoles

        #region ListarPermisosRoles
        public List<CE_PERMISOS_ROLES> ListarPermisosRoles()
        {
            List<CE_PERMISOS_ROLES> lts_asignaturas = new List<CE_PERMISOS_ROLES>();


            cmd.Connection = _connection.AbrirConexion();
            cmd.CommandText = "SP_Permisos_Roles";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Accion", SqlDbType.Char, 3).Value = "LIS";
            da.SelectCommand = cmd;

            try
            {
                da.Fill(tabla);
                if (tabla.Rows.Count > 0)
                {
                    foreach (DataRow dr in tabla.Rows)
                    {
                        CE_PERMISOS_ROLES fila = new CE_PERMISOS_ROLES();

                        fila.Id_Permiso = dr["Id_Permiso"] is DBNull ? 0 : Convert.ToInt32(dr["Id_Permiso"]);
                        fila.Id_Rol = dr["Id_Rol"] is DBNull ? 0 : Convert.ToInt32(dr["Id_Rol"]);
                        fila.Modulo = dr["Modulo"] is DBNull ? string.Empty : Convert.ToString(dr["Modulo"]);
                        fila.PuedeInsertar = dr["PuedeInsertar"] is DBNull ? false : Convert.ToBoolean(dr["PuedeInsertar"]);
                        fila.PuedeEditar = dr["PuedeEditar"] is DBNull ? false : Convert.ToBoolean(dr["PuedeEditar"]);
                        fila.PuedeVisualizar = dr["PuedeVisualizar"] is DBNull ? false : Convert.ToBoolean(dr["PuedeVisualizar"]);
                        fila.PuedeFiltrarNombre = dr["PuedeFiltrarNombre"] is DBNull ? false : Convert.ToBoolean(dr["PuedeFiltrarNombre"]);
                        fila.PuedeFiltrarId = dr["PuedeFiltrarId"] is DBNull ? false : Convert.ToBoolean(dr["PuedeFiltrarId"]);

                        lts_asignaturas.Add(fila);
                    }

                }
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
            }
            finally
            {
                cmd.Parameters.Clear();
                cmd.Connection = _connection.CerrarConexion();
            }

            return lts_asignaturas;


        }

        #endregion ListarPermisosRoles

        #region FiltrarPermisosRoles

        public List<CE_PERMISOS_ROLES> FiltrarPermisosRolesNombre(CE_PERMISOS_ROLES obj)
        {
            List<CE_PERMISOS_ROLES> lts_asignaturas = new List<CE_PERMISOS_ROLES>();


            cmd.Connection = _connection.AbrirConexion();
            cmd.CommandText = "SP_Permisos_Roles";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Accion", SqlDbType.Char, 3).Value = "FIL";
            cmd.Parameters.Add("@Modulo", SqlDbType.VarChar, 50).Value = obj.Modulo;
            da.SelectCommand = cmd;

            try
            {
                da.Fill(tabla);
                if (tabla.Rows.Count > 0)
                {
                    foreach (DataRow dr in tabla.Rows)
                    {
                        CE_PERMISOS_ROLES fila = new CE_PERMISOS_ROLES();

                        fila.Id_Permiso = dr["Id_Permiso"] is DBNull ? 0 : Convert.ToInt32(dr["Id_Permiso"]);
                        fila.Id_Rol = dr["Id_Rol"] is DBNull ? 0 : Convert.ToInt32(dr["Id_Rol"]);
                        fila.Modulo = dr["Modulo"] is DBNull ? string.Empty : Convert.ToString(dr["Modulo"]);
                        fila.PuedeInsertar = dr["PuedeInsertar"] is DBNull ? false : Convert.ToBoolean(dr["PuedeInsertar"]);
                        fila.PuedeEditar = dr["PuedeEditar"] is DBNull ? false : Convert.ToBoolean(dr["PuedeEditar"]);
                        fila.PuedeVisualizar = dr["PuedeVisualizar"] is DBNull ? false : Convert.ToBoolean(dr["PuedeVisualizar"]);
                        fila.PuedeFiltrarNombre = dr["PuedeFiltrarNombre"] is DBNull ? false : Convert.ToBoolean(dr["PuedeFiltrarNombre"]);
                        fila.PuedeFiltrarId = dr["PuedeFiltrarId"] is DBNull ? false : Convert.ToBoolean(dr["PuedeFiltrarId"]);

                        lts_asignaturas.Add(fila);
                    }

                }
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
            }
            finally
            {
                cmd.Parameters.Clear();
                cmd.Connection = _connection.CerrarConexion();
            }

            return lts_asignaturas;


        }

        #endregion FiltrarPermisosRoles

        #region FiltrarPermisosRolesID

        public List<CE_PERMISOS_ROLES> FiltrarPermisosRolesID(CE_PERMISOS_ROLES obj)
        {
            List<CE_PERMISOS_ROLES> lts_asignaturas = new List<CE_PERMISOS_ROLES>();


            cmd.Connection = _connection.AbrirConexion();
            cmd.CommandText = "SP_Permisos_Roles";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Accion", SqlDbType.Char, 3).Value = "GET";
            cmd.Parameters.Add("@Id_Permiso", SqlDbType.Int).Value = obj.Id_Permiso;
            da.SelectCommand = cmd;

            try
            {
                da.Fill(tabla);
                if (tabla.Rows.Count > 0)
                {
                    foreach (DataRow dr in tabla.Rows)
                    {
                        CE_PERMISOS_ROLES fila = new CE_PERMISOS_ROLES();

                        fila.Id_Permiso = dr["Id_Permiso"] is DBNull ? 0 : Convert.ToInt32(dr["Id_Permiso"]);
                        fila.Id_Rol = dr["Id_Rol"] is DBNull ? 0 : Convert.ToInt32(dr["Id_Rol"]);
                        fila.Modulo = dr["Modulo"] is DBNull ? string.Empty : Convert.ToString(dr["Modulo"]);
                        fila.PuedeInsertar = dr["PuedeInsertar"] is DBNull ? false : Convert.ToBoolean(dr["PuedeInsertar"]);
                        fila.PuedeEditar = dr["PuedeEditar"] is DBNull ? false : Convert.ToBoolean(dr["PuedeEditar"]);
                        fila.PuedeVisualizar = dr["PuedeVisualizar"] is DBNull ? false : Convert.ToBoolean(dr["PuedeVisualizar"]);
                        fila.PuedeFiltrarNombre = dr["PuedeFiltrarNombre"] is DBNull ? false : Convert.ToBoolean(dr["PuedeFiltrarNombre"]);
                        fila.PuedeFiltrarId = dr["PuedeFiltrarId"] is DBNull ? false : Convert.ToBoolean(dr["PuedeFiltrarId"]);

                        lts_asignaturas.Add(fila);
                    }

                }
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
            }
            finally
            {
                cmd.Parameters.Clear();
                cmd.Connection = _connection.CerrarConexion();
            }

            return lts_asignaturas;


        }

        #endregion FiltrarPermisosRolesID
    }
}
