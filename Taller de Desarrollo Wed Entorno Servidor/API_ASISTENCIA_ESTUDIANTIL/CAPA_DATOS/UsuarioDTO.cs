using CAPA_ENTIDADES;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_DATOS
{
    public class UsuarioDTO
    {
        public int? Id_Persona { get; set; }
        public string? Usuario { get; set; }
        public string? Contrasena { get; set; }
        
        public int? Id_Usuario { get; set; }
    }
}
