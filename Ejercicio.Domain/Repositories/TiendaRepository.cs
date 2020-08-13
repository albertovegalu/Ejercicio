using Ejercicio.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ejercicio.Domain.Repositories
{
   public class TiendaRepository: GenericDataRepository<Tienda>, ITiendaRepository
    {
        public TiendaRepository(EjercicioContext context): base(context)
        {

        }

        public async Task<int> AddStore(Tienda tienda)
        {
            int result = await Create(tienda);

            return result;
        }

        public async Task<int> DeleteStore(Tienda tienda)
        {
            int result = await Delete(tienda);

            return result;
        }

        public async Task<List<Tienda>> GetStores()
        {
            return await GetAll().ToListAsync();
        }

        public async Task<int> UpdateStore(Tienda tienda)
        {
            int result = await Update(tienda);

            return result;
        }
    }
}