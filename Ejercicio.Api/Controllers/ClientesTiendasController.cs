using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ejercicio.DataAccess.Dto;
using Ejercicio.DataAccess.Models;
using Ejercicio.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Ejercicio.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesTiendasController : ControllerBase
    {
        private readonly IClienteTiendaRepository _repository;

        public ClientesTiendasController(IClienteTiendaRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<ActionResult> AddClientStore(ClienteTiendaDto clienteTiendaDto)
        {
            try
            {
                clienteTiendaDto.Fecha = DateTime.Parse(clienteTiendaDto.FechaCliente);

                ClienteTienda clienteTienda = ObjectMapping<ClienteTiendaDto, ClienteTienda>.MapObject(clienteTiendaDto);

                int result = await _repository.AddClientStore(clienteTienda);

                if (result.Equals(0))
                {
                    BadRequest();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Ocurrió un error en el servidor");
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetClientStore()
        {
            try
            {
                var context = new EjercicioContext();

                List<ClienteTiendaDto> ventas = await (from venta in context.ClienteTienda
                                                       join cliente in context.Clientes on venta.IdCliente equals cliente.IdCliente
                                                       join tienda in context.Tienda on venta.IdTienda equals tienda.IdTienda
                                                       select new ClienteTiendaDto
                                                       {
                                                           IdVenta = venta.IdVenta,
                                                           IdCliente = venta.IdCliente,
                                                           IdTienda = venta.IdTienda,
                                                           NombreCliente = string.Join(" ", new[] { cliente.Nombre, cliente.Apellidos }),
                                                           NombreSucursal = tienda.Sucursal,
                                                           Monto = venta.Monto,
                                                           Fecha = venta.Fecha
                                                       }).ToListAsync();

                if (ventas == null)
                {
                    return BadRequest();
                }

                return Ok(ventas);
            }
            catch (Exception)
            {
                throw new ArgumentException("Ocurrió un error en el servidor");
            }
        }

        [HttpPut]
        public async Task<ActionResult> UpdateClientStore(ClienteTiendaDto clienteTiendaDto)
        {
            try
            {
                ClienteTienda clienteTienda = ObjectMapping<ClienteTiendaDto, ClienteTienda>.MapObject(clienteTiendaDto);

                int result = await _repository.UpdateClientStore(clienteTienda);

                if (result.Equals(0))
                {
                    BadRequest();
                }

                return Ok();
            }
            catch (Exception)
            {
                throw new ArgumentException("Ocurrió un error en el servidor");
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteClientStore(long idSell)
        {
            try
            {
                ClienteTienda clienteTienda = _repository.GetClientStores().Result.First(x => x.IdVenta == idSell);

                int result = await _repository.DeleteClientStore(clienteTienda);

                if (result.Equals(0))
                {
                    BadRequest();
                }

                return Ok();
            }
            catch (Exception)
            {
                throw new ArgumentException("Ocurrió un error en el servidor");
            }
        }

        [HttpGet]
        [Route("purchases")]
        public async Task<ActionResult> GetMajorPurchases()
        {
            try
            {
                var context = new EjercicioContext();

                List<ClienteTiendaDto> clients = await (from venta in context.ClienteTienda
                                                        join cliente in context.Clientes on venta.IdCliente equals cliente.IdCliente
                                                        group venta by new { venta.IdCliente, cliente.Nombre, cliente.Apellidos } into g
                                                        select new ClienteTiendaDto
                                                        {
                                                            NombreCliente = string.Join(" ", new[] { g.Key.Nombre, g.Key.Apellidos }),
                                                            Monto = g.Sum(x => x.Monto)
                                                        }).ToListAsync();

                if (clients == null)
                {
                    return BadRequest();
                }

                ClienteTiendaDto client = clients.OrderByDescending(x => x.Monto).First();

                return Ok(client);
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Ocurrió un error en el servidor");
            }
        }
    }
}