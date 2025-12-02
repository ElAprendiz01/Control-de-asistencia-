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
    public class CN_PERMISOS_ROLES
    {
        private readonly CD_PERMISOS_ROLES cD_PERMISOS_ROLES;

        public CN_PERMISOS_ROLES(IConfiguration configuration)
        {

            cD_PERMISOS_ROLES = new CD_PERMISOS_ROLES(configuration);
        }

        public void InsertarPermisosRoles(CE_PERMISOS_ROLES obj, out int resultado, out string mensaje)
        {
            cD_PERMISOS_ROLES.InsertarPermisosRoles(obj, out resultado, out mensaje);
        }

        public void ActualizarPermisosRoles(CE_PERMISOS_ROLES obj, out int resultado, out string mensaje)
        {
            cD_PERMISOS_ROLES.ActualizarPermisosRoles(obj, out resultado, out mensaje);
        }

        public List<CE_PERMISOS_ROLES> ListarPermisosRoles()
        {
            return cD_PERMISOS_ROLES.ListarPermisosRoles();
        }

        public List<CE_PERMISOS_ROLES> FiltrarPermisosRolesNombre(CE_PERMISOS_ROLES obj)
        {
            return cD_PERMISOS_ROLES.FiltrarPermisosRolesNombre(obj);
        }

      

        public List<CE_PERMISOS_ROLES> FiltrarPermisosRolesID(CE_PERMISOS_ROLES obj)
        {
            return cD_PERMISOS_ROLES.FiltrarPermisosRolesID(obj);
        }

       
    }
}
