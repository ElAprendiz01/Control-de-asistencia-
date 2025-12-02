using API_ASISTENCIA_ESTUDIANTIL.ApiModels;
using CAPA_DATOS;
using CAPA_ENTIDADES;
using CAPA_NEGOCIO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_ASISTENCIA_ESTUDIANTIL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PERMISOS_ROLESController : Controller
    {
        private readonly CN_PERMISOS_ROLES cN_PERMISOS_ROLES;

        int resultado;
        string mensaje;

        CE_PERMISOS_ROLES cE_PERMISOS_ROLES = new CE_PERMISOS_ROLES();

        public PERMISOS_ROLESController(IConfiguration configuration)
        {
            cN_PERMISOS_ROLES = new CN_PERMISOS_ROLES(configuration);
        }

        [HttpGet("OBTENER_PERMISOS_ROLES")]
        public ActionResult<CE_PERMISOS_ROLES> ListarPermisosRoles()
        {
            var resultado = cN_PERMISOS_ROLES.ListarPermisosRoles();

            if(resultado.Count == 0)
            {
                return NoContent();
            }
            else
            {
                return Ok(resultado);
            }
        }

        [HttpGet("BUSCAR_PERMISO_ROL_ID")]

        public ActionResult<CE_PERMISOS_ROLES> FiltrarPermisosRolesID([FromHeader] int? Id_Permiso)
        {
            cE_PERMISOS_ROLES.Id_Permiso = Id_Permiso;

            var resultado = cN_PERMISOS_ROLES.FiltrarPermisosRolesID(cE_PERMISOS_ROLES);

            if(resultado.Count == 0)
            {
                return NoContent();
            }
            else
            {
                return Ok(resultado);
            }
        }

        [HttpGet("BUSCAR_PERMISO_ROL_NOMBRE")]
        public ActionResult<CE_PERMISOS_ROLES> FiltrarPermisosRolesModulo([FromHeader] string? Modulo)
        {
            cE_PERMISOS_ROLES.Modulo = Modulo;

            var resultado = cN_PERMISOS_ROLES.FiltrarPermisosRolesNombre(cE_PERMISOS_ROLES);

            if (resultado.Count == 0)
            {
                return NoContent();
            }
            else
            {
                return Ok(resultado);
            }
        }

        [HttpPost("INSERTAR_PERMISOS_ROLES")]
        public ActionResult<List<CE_ASIGNATURAS>> InsertarPermisosRoles([FromBody] ApiModels.AM_PERMISOS_ROLES aM_PERMISOS_ROLES)
        {
            cE_PERMISOS_ROLES.Id_Rol = aM_PERMISOS_ROLES.Id_Rol;
            cE_PERMISOS_ROLES.Modulo = aM_PERMISOS_ROLES.Modulo;
            cE_PERMISOS_ROLES.PuedeInsertar = aM_PERMISOS_ROLES.PuedeInsertar;
            cE_PERMISOS_ROLES.PuedeEditar = aM_PERMISOS_ROLES.PuedeEditar;
            cE_PERMISOS_ROLES.PuedeVisualizar = aM_PERMISOS_ROLES.PuedeVisualizar;
            cE_PERMISOS_ROLES.PuedeFiltrarNombre = aM_PERMISOS_ROLES.PuedeFiltrarNombre;
            cE_PERMISOS_ROLES.PuedeFiltrarId = aM_PERMISOS_ROLES.PuedeFiltrarId;

            AM_RESULTADO _RESULTADO = new AM_RESULTADO();

            try
            {
                cN_PERMISOS_ROLES.InsertarPermisosRoles(cE_PERMISOS_ROLES, out resultado, out mensaje);
                _RESULTADO.resultado = resultado;
                _RESULTADO.mensaje = mensaje;

                return Ok(_RESULTADO);
            }
            catch
            {
                return BadRequest(_RESULTADO);
            }
        }

        [HttpPut("ACTUALIZAR_PERMISOS_ROLES_")]
        public ActionResult<List<CE_ASIGNATURAS>> ActualizarPermisosRoles([FromBody] ApiModels.AM_PERMISOS_ROLES aM_PERMISOS_ROLES)
        {
            cE_PERMISOS_ROLES.Id_Permiso = aM_PERMISOS_ROLES.Id_Permiso;
            cE_PERMISOS_ROLES.Id_Rol = aM_PERMISOS_ROLES.Id_Rol;
            cE_PERMISOS_ROLES.Modulo = aM_PERMISOS_ROLES.Modulo;
            cE_PERMISOS_ROLES.PuedeInsertar = aM_PERMISOS_ROLES.PuedeInsertar;
            cE_PERMISOS_ROLES.PuedeEditar = aM_PERMISOS_ROLES.PuedeEditar;
            cE_PERMISOS_ROLES.PuedeVisualizar = aM_PERMISOS_ROLES.PuedeVisualizar;
            cE_PERMISOS_ROLES.PuedeFiltrarNombre = aM_PERMISOS_ROLES.PuedeFiltrarNombre;
            cE_PERMISOS_ROLES.PuedeFiltrarId = aM_PERMISOS_ROLES.PuedeFiltrarId;

            AM_RESULTADO _RESULTADO = new AM_RESULTADO();

            try
            {
                cN_PERMISOS_ROLES.ActualizarPermisosRoles(cE_PERMISOS_ROLES, out resultado, out mensaje);
                _RESULTADO.resultado = resultado;
                _RESULTADO.mensaje = mensaje;

                return Ok(_RESULTADO);
            }
            catch
            {
                return BadRequest(_RESULTADO);
            }
        }
    }
}
