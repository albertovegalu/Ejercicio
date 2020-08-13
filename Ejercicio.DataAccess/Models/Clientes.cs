using System;
using System.Collections.Generic;

namespace Ejercicio.DataAccess.Models
{
    public partial class Clientes
    {
        public Clientes()
        {
            ClienteTienda = new HashSet<ClienteTienda>();
        }

        public long IdCliente { get; set; }
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Direccion { get; set; }

        public virtual ICollection<ClienteTienda> ClienteTienda { get; set; }
    }
}
