using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CAPA_DATOS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using CAPA_ENTIDADES;
using CAPA_NEGOCIO;
using API_ASISTENCIA_ESTUDIANTIL.ApiModels;
using API_ASISTENCIA_ESTUDIANTIL.Controllers.Customs;



namespace API_ASISTENCIA_ESTUDIANTIL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessController : ControllerBase
    {
        private readonly CN_USUARIOS _usuarios;
        private readonly Utilities _utils;
        int resultado;
        string mensaje;
        public AccessController(CN_USUARIOS usuarios, Utilities utils)
        {
            _usuarios = usuarios;
            _utils = utils;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Registrarse")]
        public IActionResult Registrarse([FromBody] UsuarioDTO user)
        {
            var modeloUsuario = new CE_USUARIOS
            {
                Id_Persona = user.Id_Persona,
                Usuario = user.Usuario,
                Contrasena = _utils.EncryptSHA256(user.Contrasena)
            };

            AM_RESULTADO _RESULTADO = new AM_RESULTADO();

            try
            {
                _usuarios.CN_Insertar_Usuarios(modeloUsuario, out resultado, out mensaje);
                _RESULTADO.resultado = resultado;
                _RESULTADO.mensaje = mensaje;
                return Ok(_RESULTADO);
            }
            catch
            {
                return BadRequest(_RESULTADO);
            }
            
            
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] UsuarioDTO login)
        {
            string hash = _utils.EncryptSHA256(login.Contrasena);
            int resultado;
            string mensaje;
            AM_RESULTADO _RESULTADO = new AM_RESULTADO();

            // 1. Validamos las credenciales (login)

            _usuarios.CN_Login_Usuario(login.Usuario, hash, out resultado, out mensaje);


            if (resultado == 0)
            {
                return Unauthorized(new { isSuccess = false, token = "", mensaje });
            }

            // 2. Obtenemos los datos del usuario para el token
           UsuarioDTO usuarioEncontrado = _usuarios.CN_ObtenerUsuario(login.Usuario, hash, out mensaje, out resultado);


            if (usuarioEncontrado == null)
            {
                //return Unauthorized(new { isSuccess = false, token = "", mensaje = "Error al obtener datos del usuario." });
                return Unauthorized(new { isSuccess = false, token = "",  resultado,  mensaje });
            }
            // 3. Generamos el token con los datos del usuario
            else { 
                string token = _utils.generarJWT(usuarioEncontrado);

                return Ok(new
                {
                    TokenAccess = new
                    {
                        Token = token
                    },
                    Result = new
                    {
                        Resultado = resultado,
                        Mensaje = mensaje
                    }
                });
            }
        }


    }
}
