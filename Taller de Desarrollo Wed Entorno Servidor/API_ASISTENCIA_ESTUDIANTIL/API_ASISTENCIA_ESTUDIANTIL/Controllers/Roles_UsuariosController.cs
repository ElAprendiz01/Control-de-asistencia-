using API_ASISTENCIA_ESTUDIANTIL.ApiModels;
using CAPA_ENTIDADES;
using CAPA_NEGOCIO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API_ASISTENCIA_ESTUDIANTIL.Controllers
{
    [Route("api[controller]")]
    [ApiController]
    public class Roles_UsuariosController : ControllerBase
    {

        private readonly CN_Roles_Usuarios _cN_Roles_Usuarios;

        int resultado;
        string mensaje;

        CE_Roles_Usuarios CE_Roles_Usuarios = new CE_Roles_Usuarios();

        public Roles_UsuariosController(IConfiguration configuration)
        {
            _cN_Roles_Usuarios = new CN_Roles_Usuarios(configuration);
        }

        [HttpGet("OBTENER_ROL")]
        public ActionResult<CE_Roles_Usuarios> ListarRol()
        {
            var resultado = _cN_Roles_Usuarios.ListarRol();

            if (resultado.Count == 0)
            {
                return NoContent();
            }
            else
            {
                return Ok(resultado);
            }
        }

        [HttpGet("BUSCAR_ROL_ID")]

        public ActionResult<CE_Roles_Usuarios> FiltrarRolId([FromHeader] int? Id_Rol)
        {
            CE_Roles_Usuarios.Id_Rol = Id_Rol;

            var resultado = _cN_Roles_Usuarios.FiltrarRolId(CE_Roles_Usuarios);

            if (resultado.Count == 0)
            {
                return NoContent();
            }
            else
            {
                return Ok(resultado);
            }
        }

        [HttpGet("BUSCAR_ROL_NOMBRE")]

        public ActionResult<CE_Roles_Usuarios> FiltrarRol([FromHeader] String? NombreRol)
        {
            CE_Roles_Usuarios.NombreRol = NombreRol;

            var resultado = _cN_Roles_Usuarios.FiltrarRol(CE_Roles_Usuarios);

            if (resultado.Count == 0)
            {
                return NoContent();
            }
            else
            {
                return Ok(resultado);
            }
        }

        [HttpPost("INSERTAR_ROL")]

        public ActionResult<CE_Roles_Usuarios> InsertarRoles([FromHeader] int? Id_Usuario, string? NombreRol,string? contrasena)
        {
            CE_Roles_Usuarios.NombreRol = NombreRol;
            CE_Roles_Usuarios.Id_Usuario = Id_Usuario;
            CE_Roles_Usuarios.Id_Usuario = Id_Usuario;
            

            AM_RESULTADO _RESULTADO = new AM_RESULTADO();

            try
            {
                _cN_Roles_Usuarios.InsertarRoles(CE_Roles_Usuarios, out resultado, out mensaje);
                _RESULTADO.resultado = resultado;
                _RESULTADO.mensaje = mensaje;

                return Ok(_RESULTADO);
            }
            catch
            {
                return BadRequest(_RESULTADO);
            }
        }

        [HttpPost("ACTUALZIAR_ROL")]

        public ActionResult<CE_Roles_Usuarios> ActualizarRol([FromHeader] int? Id_Rol,string? NombreRol, int? Id_Usuario)
        {
            CE_Roles_Usuarios.Id_Rol = Id_Rol;
            CE_Roles_Usuarios.NombreRol = NombreRol;
            CE_Roles_Usuarios.Id_Usuario = Id_Usuario;

            AM_RESULTADO _RESULTADO = new AM_RESULTADO();

            try
            {
                _cN_Roles_Usuarios.ActualizarRol(CE_Roles_Usuarios, out resultado, out mensaje);
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
