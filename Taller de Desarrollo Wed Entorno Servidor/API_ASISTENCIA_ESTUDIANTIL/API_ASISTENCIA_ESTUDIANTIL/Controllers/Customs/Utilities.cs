using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using CAPA_DATOS;
using CAPA_ENTIDADES;
using API_ASISTENCIA_ESTUDIANTIL.ApiModels;


namespace API_ASISTENCIA_ESTUDIANTIL.Controllers.Customs
{
    public class Utilities
    {
        private readonly IConfiguration _configuration;

        public Utilities(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string EncryptSHA256(string text)
        {
            using (SHA256 sha256SHA = SHA256.Create())
            {

                //computar el hash

                byte[] bytes = sha256SHA.ComputeHash(Encoding.UTF8.GetBytes(text));

                StringBuilder builder = new StringBuilder();

                for(int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }

                return builder.ToString();
            }
        }

        public string generarJWT(UsuarioDTO user)
        {
            //Recopilar la informacion del usuario para el TOken
            var userClaims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id_Persona.ToString()),
                new Claim(ClaimTypes.Name, user.Usuario.ToString()),
                new Claim("IdUsuario", user.Id_Usuario.ToString())
            };

            var security = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:key"]!));

            var credential = new SigningCredentials(security, SecurityAlgorithms.HmacSha256Signature);

            //Configurar y crear detalle del token

            var jwtConfig = new JwtSecurityToken(

                claims: userClaims,
                expires: DateTime.UtcNow.AddMinutes(10),
                signingCredentials: credential

            );

            return new JwtSecurityTokenHandler().WriteToken(jwtConfig);
            
        }
    }
}
