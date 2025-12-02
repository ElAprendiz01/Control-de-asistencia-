using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_ENTIDADES
{
    public class CE_PERMISOS_ROLES
    {
        public int? Id_Permiso {  get; set; }
        public int? Id_Rol  {get; set; }
        public string? Modulo  {  get; set; }
        public bool? PuedeInsertar {  get; set; }
        public bool? PuedeEditar {  get; set; }
        public bool? PuedeVisualizar {  get; set; }
        public bool? PuedeFiltrarNombre {  get; set; }
        public bool? PuedeFiltrarId {  get; set; }
      
    }
}
