using System;
using System.Collections.Generic;

namespace Ejercicio.DataAccess.Models
{
    public partial class Tienda
    {
        public Tienda()
        {
            ClienteTienda = new HashSet<ClienteTienda>();
        }

        public int IdTienda { get; set; }
        public string Sucursal { get; set; }
        public string Direccion { get; set; }

        public virtual ICollection<ClienteTienda> ClienteTienda { get; set; }
    }
}
