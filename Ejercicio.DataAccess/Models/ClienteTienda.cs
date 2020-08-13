using System;
using System.Collections.Generic;

namespace Ejercicio.DataAccess.Models
{
    public partial class ClienteTienda
    {
        public long IdVenta { get; set; }
        public long IdCliente { get; set; }
        public int IdTienda { get; set; }
        public decimal Monto { get; set; }
        public DateTime Fecha { get; set; }

        public virtual Clientes IdClienteNavigation { get; set; }
        public virtual Tienda IdTiendaNavigation { get; set; }
    }
}
