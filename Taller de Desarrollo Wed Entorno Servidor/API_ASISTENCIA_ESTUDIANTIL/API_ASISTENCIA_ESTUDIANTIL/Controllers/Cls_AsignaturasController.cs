using API_ASISTENCIA_ESTUDIANTIL.ApiModels;
using CAPA_ENTIDADES;
using CAPA_NEGOCIO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API_ASISTENCIA_ESTUDIANTIL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Cls_AsignaturasController : ControllerBase
    {
        private readonly CN_ASIGNATURAS _CN_Asignaturas;

        int resultado;
        string mensaje;

        CE_ASIGNATURAS _CE_Asignaturas = new CE_ASIGNATURAS();

        public Cls_AsignaturasController(IConfiguration configuration)
        {
            _CN_Asignaturas = new CN_ASIGNATURAS(configuration);

        }

        [HttpGet("OBTENER_ASIGNATURAS")]

        public ActionResult<CE_ASIGNATURAS> ListarAsignaturas()
        {
            var resultado = _CN_Asignaturas.CN_Listar_Asignaturas();

            if (resultado.Count == 0)
            {
                return NoContent();
            }
            else
            {
                return Ok(resultado);
            }
        }

        [HttpGet("BUSCAR_ASIGNATURAS_POR_ID")]

        public ActionResult<CE_ASIGNATURAS> BuscarAsignaturasid([FromHeader] int? Id_Asignatura)
        {
            _CE_Asignaturas.Id_Asignatura = Id_Asignatura;

            var resultado = _CN_Asignaturas
                .CN_Filtrar_AsignaturasID(_CE_Asignaturas);

            if (resultado.Count == 0)
            {
                return NoContent();
            }
            else
            {
                return Ok(resultado);
            }
        }


        [HttpGet("BUSCAR_ASIGNATURAS")]

        public ActionResult<CE_ASIGNATURAS> BuscarAsignaturas([FromHeader] string? NombreAsignatura)
        {
            _CE_Asignaturas.Nombre_Asignatura = NombreAsignatura;

            var resultado = _CN_Asignaturas.CN_Filtrar_Asignaturas(_CE_Asignaturas);

            if (resultado.Count == 0)
            {
                return NoContent();
            }
            else
            {
                return Ok(resultado);
            }
        }
        [Authorize]
        [HttpPost("INSERTAR_ASIGNATURAS")]
        public ActionResult<List<CE_ASIGNATURAS>> Insertar_Asignaturas([FromBody] AM_ASIGNATURAS _am_Asignaturas)
        {
            var idUsuarioClaim = User.Claims.FirstOrDefault(c => c.Type == "IdUsuario")?.Value;
            if (string.IsNullOrEmpty(idUsuarioClaim))
                return Unauthorized(new { mensaje = "No se encontró el claim de IdUsuario en el token." });

            int idUsuario = Convert.ToInt32(idUsuarioClaim);


            // 2. Armar el objeto CE_ASIGNATURAS con campos de auditoría
            _CE_Asignaturas.Id_Asignatura = _am_Asignaturas.Id_Asignatura;
            _CE_Asignaturas.Nombre_Asignatura = _am_Asignaturas.Nombre_Asignatura;
            _CE_Asignaturas.Id_Creador = idUsuario;
            _CE_Asignaturas.Id_Modificador = idUsuario; // opcional en inserción
            _CE_Asignaturas.Id_Estado = _am_Asignaturas.Id_Estado;

            // 3. Ejecutar y devolver respuesta
            AM_RESULTADO _RESULTADO = new AM_RESULTADO();

            try
            {
                _CN_Asignaturas.CN_Insertar_Asignaturas(_CE_Asignaturas, out resultado, out mensaje);
                _RESULTADO.resultado = resultado;
                _RESULTADO.mensaje = mensaje;

                return Ok(_RESULTADO);
            }
            catch
            {
                return BadRequest(_RESULTADO);
            }
        }
        [Authorize]
        [HttpPut("ACTUALIZAR_ASIGNATURAS")]
        public ActionResult<List<CE_ASIGNATURAS>> Actualizar_Asignaturas([FromBody] AM_ASIGNATURAS _am_Asignaturas)
        {
            // 1. Obtener el IdUsuario desde el JWT
            var idUsuarioClaim = User.Claims.FirstOrDefault(c => c.Type == "IdUsuario")?.Value;
            if (string.IsNullOrEmpty(idUsuarioClaim))
                return Unauthorized(new { mensaje = "No se encontró el claim de IdUsuario en el token." });

            int idUsuario = Convert.ToInt32(idUsuarioClaim);

            // 2. Armar el objeto CE_ASIGNATURAS con campos de auditoría
            _CE_Asignaturas.Id_Asignatura = _am_Asignaturas.Id_Asignatura;
            _CE_Asignaturas.Nombre_Asignatura = _am_Asignaturas.Nombre_Asignatura;
            _CE_Asignaturas.Id_Modificador = idUsuario;
            _CE_Asignaturas.Id_Estado = _am_Asignaturas.Id_Estado;


            // 3. Ejecutar y devolver respuesta
            AM_RESULTADO _RESULTADO = new AM_RESULTADO();

            try
            {
                _CN_Asignaturas.CN_Actualizar_Asignaturas(_CE_Asignaturas, out resultado, out mensaje);
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
