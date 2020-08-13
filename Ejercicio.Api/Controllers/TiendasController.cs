using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ejercicio.DataAccess.Models;
using Ejercicio.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Ejercicio.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TiendasController : ControllerBase
    {
        private readonly ITiendaRepository _repository;

        public TiendasController(ITiendaRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult> GetStores()
        {
            try
            {
                List<Tienda> tiendas = await _repository.GetStores();

                if (tiendas == null)
                {
                    return BadRequest();
                }

                return Ok(tiendas);
            }
            catch (Exception)
            {
                throw new ArgumentException("Ocurrió un error en el servidor");
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddStore(Tienda tienda)
        {
            try
            {
                int result = await _repository.AddStore(tienda);

                if (result.Equals(0))
                {
                    return BadRequest();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Ocurrió un error en el servidor");
            }
        }

        [HttpPut]
        public async Task<ActionResult> UpdateStore(Tienda tienda)
        {
            try
            {
                int result = await _repository.UpdateStore(tienda);

                if (result.Equals(0))
                {
                    return BadRequest();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Ocurrió un error en el servidor");
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteStore(int idStore)
        {
            try
            {
                Tienda store = _repository.GetStores().Result.First(x => x.IdTienda == idStore);

                int result = await _repository.DeleteStore(store);

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