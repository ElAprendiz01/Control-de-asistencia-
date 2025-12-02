using CAPA_DATOS;
using CAPA_ENTIDADES;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO
{
    public class CN_Roles_Usuarios
    {


        private readonly CD_Roles_Usuarios cD_Roles_Usuarios;

        public CN_Roles_Usuarios(IConfiguration configuration)
        {
            cD_Roles_Usuarios = new CD_Roles_Usuarios(configuration);
        }

        public void InsertarRoles(CE_Roles_Usuarios obj, out int resultado, out string mensaje)
        {
            cD_Roles_Usuarios.InsertarRoles(obj, out resultado, out mensaje);
        }

        public void ActualizarRol(CE_Roles_Usuarios obj, out int resultado, out string mensaje)
        {
            cD_Roles_Usuarios.ActualizarRol(obj, out resultado, out mensaje);
        }

        public List<CE_Roles_Usuarios> ListarRol()
        {
            return cD_Roles_Usuarios.ListarRol();
        }

        public List<CE_Roles_Usuarios> FiltrarRol(CE_Roles_Usuarios obj)
        {
            return cD_Roles_Usuarios.FiltrarRol(obj);
        }

        public List<CE_Roles_Usuarios> FiltrarRolId(CE_Roles_Usuarios obj)
        {
            return cD_Roles_Usuarios.FiltrarRolId(obj);
        }

    }
}
