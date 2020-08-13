using System;

namespace Ejercicio.DataAccess.Dto
{
    public class ClienteTiendaDto
    {
        public long IdVenta { get; set; }
        public long IdCliente { get; set; }
        public int IdTienda { get; set; }
        public decimal Monto { get; set; }
        public string FechaCliente { get; set; }
        public DateTime Fecha { get; set; }

        public string NombreCliente { get; set; }
        public string NombreSucursal { get; set; }
    }
}