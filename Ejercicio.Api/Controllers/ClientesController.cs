using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ejercicio.DataAccess.Models;
using Ejercicio.Domain.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Ejercicio.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowOrigin")]
    public class ClientesController : ControllerBase
    {
        private readonly IClientesRepository _repository;

        public ClientesController(IClientesRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllClients()
        {
            try
            {
                List<Clientes> clients = await _repository.GetClientes();

                if (clients == null)
                {
                    return BadRequest();
                }

                return Ok(clients);
            }
            catch (Exception)
            {
                throw new ArgumentException("Ocurrió un error en el servidor");
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddClient(Clientes client)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                int result = await _repository.CreateClient(client);

                if (result == 0)
                {
                    return BadRequest();
                }

                return Ok();
            }
            catch (Exception)
            {
                throw new ArgumentException("Ocurrió un error en el servidor");
            }
        }

        [HttpPut]
        public async Task<ActionResult> UpdateClient(Clientes client)
        {
            try
            {
                int result = await _repository.UpdateClient(client);

                if (result == 0)
                {
                    return BadRequest();
                }

                return Ok();
            }
            catch (Exception)
            {
                throw new ArgumentException("Ocurrió un error en el servidor");
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteClient(long idClient)
        {
            try
            {
                Clientes client = _repository.GetClientes().Result.First(x => x.IdCliente == idClient);

                int result = await _repository.DeleteClient(client);

                if (result.Equals(0))
                {
                    return BadRequest();
                }

                return Ok();
            }
            catch (Exception)
            {
                throw new ArgumentException("Ocurrió un error en el servidor");
            }
        }
    }
}