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
    public class CD_Roles_Usuarios
    {
        private readonly CD_CONEXION _connection;
        DataTable tabla = new DataTable();
        SqlDataAdapter da = new SqlDataAdapter();
        SqlCommand cmd = new SqlCommand();

        public CD_Roles_Usuarios(IConfiguration configuration)
        {
            _connection = new CD_CONEXION(configuration);

        }

        #region Insertar_Rol

        public void InsertarRoles(CE_Roles_Usuarios obj, out int resultado, out string mensaje)
        {
            cmd.Connection = _connection.AbrirConexion();
            cmd.CommandText = "SP_Roles_Usuarios";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Accion", SqlDbType.Char, 3).Value = "INS";
            cmd.Parameters.Add("@NombreRol", SqlDbType.VarChar, 50).Value = obj.NombreRol;
            cmd.Parameters.Add("@Id_Usuario", SqlDbType.Int).Value = obj.Id_Usuario;

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
                throw new Exception($"Error al ingresar gupo asignatura: " + ex.Message, ex);
            }
            finally
            {
                cmd.Parameters.Clear();
                cmd.Connection = _connection.CerrarConexion();
            }
        }


        #endregion Insertar_Rol

        #region ActualizarRol

        public void ActualizarRol (CE_Roles_Usuarios obj, out int resultado, out string mensaje)
        {



            cmd.Connection = _connection.AbrirConexion();
            cmd.CommandText = "SP_Roles_Usuarios";
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add("@Accion", SqlDbType.Char, 3).Value = "UPD";
            cmd.Parameters.Add("@Id_Rol", SqlDbType.Int).Value = obj.Id_Rol ?? (object)DBNull.Value;
            cmd.Parameters.Add("@NombreRol", SqlDbType.VarChar, 50).Value = obj.NombreRol ?? (object)DBNull.Value;
            cmd.Parameters.Add("@Id_Usuario", SqlDbType.Int).Value = obj.Id_Usuario ?? (object)DBNull.Value;

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


        #endregion ActualizarRol

        #region ListarRol
        public List<CE_Roles_Usuarios> ListarRol()
        {
            List<CE_Roles_Usuarios> lts_asignaturas = new List<CE_Roles_Usuarios>();


            cmd.Connection = _connection.AbrirConexion();
            cmd.CommandText = "SP_Roles_Usuarios";
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
                        CE_Roles_Usuarios fila = new CE_Roles_Usuarios();

                        fila.Id_Rol = dr["Id_Rol"] is DBNull ? 0 : Convert.ToInt32(dr["Id_Rol"]);
                        fila.NombreRol = dr["NombreRol"] is DBNull ? string.Empty : Convert.ToString(dr["NombreRol"]);
                        fila.Id_Usuario = dr["Id_Usuario"] is DBNull ? 0 : Convert.ToInt32(dr["Id_Usuario"]);

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

        #endregion ListarRol

        #region FiltrarRol

        public List<CE_Roles_Usuarios> FiltrarRol(CE_Roles_Usuarios obj)
        {
            List<CE_Roles_Usuarios> lts_asignaturas = new List<CE_Roles_Usuarios>();


            cmd.Connection = _connection.AbrirConexion();
            cmd.CommandText = "SP_Roles_Usuarios";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Accion", SqlDbType.Char, 3).Value = "FIL";
            cmd.Parameters.Add("@NombreRol", SqlDbType.VarChar, 50).Value = obj.NombreRol;
            da.SelectCommand = cmd;

            try
            {
                da.Fill(tabla);
                if (tabla.Rows.Count > 0)
                {
                    foreach (DataRow dr in tabla.Rows)
                    {
                        CE_Roles_Usuarios fila = new CE_Roles_Usuarios();

                        fila.Id_Rol = dr["Id_Rol"] is DBNull ? 0 : Convert.ToInt32(dr["Id_Rol"]);
                        fila.NombreRol = dr["NombreRol"] is DBNull ? string.Empty : Convert.ToString(dr["NombreRol"]);
                        fila.Id_Usuario = dr["Id_Usuario"] is DBNull ? 0 : Convert.ToInt32(dr["Id_Usuario"]);

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

        #endregion FiltrarRol

        #region FiltrarRolID

        public List<CE_Roles_Usuarios> FiltrarRolId(CE_Roles_Usuarios obj)
        {
            List<CE_Roles_Usuarios> lts_asignaturas = new List<CE_Roles_Usuarios>();


            cmd.Connection = _connection.AbrirConexion();
            cmd.CommandText = "SP_Roles_Usuarios";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Accion", SqlDbType.Char, 3).Value = "GET";
            cmd.Parameters.Add("@Id_Rol", SqlDbType.Int).Value = obj.Id_Rol;
            da.SelectCommand = cmd;

            try
            {
                da.Fill(tabla);
                if (tabla.Rows.Count > 0)
                {
                    foreach (DataRow dr in tabla.Rows)
                    {
                        CE_Roles_Usuarios fila = new CE_Roles_Usuarios();

                        fila.Id_Rol = dr["Id_Rol"] is DBNull ? 0 : Convert.ToInt32(dr["Id_Rol"]);
                        fila.NombreRol = dr["NombreRol"] is DBNull ? string.Empty : Convert.ToString(dr["NombreRol"]);
                        fila.Id_Usuario = dr["Id_Usuario"] is DBNull ? 0 : Convert.ToInt32(dr["Id_Usuario"]);

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

        #endregion FiltrarRolID
    }
}
