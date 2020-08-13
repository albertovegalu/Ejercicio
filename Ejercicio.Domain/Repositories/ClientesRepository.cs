using Ejercicio.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ejercicio.Domain.Repositories
{
    public class ClientesRepository : GenericDataRepository<Clientes>, IClientesRepository
    {
        public ClientesRepository(EjercicioContext context): base(context)
        {

        }

        public async Task<int> CreateClient(Clientes client)
        {
            int result = await Create(client);

            return result;
        }

        public async Task<int> DeleteClient(Clientes client)
        {
            int result = await Delete(client);

            return result;
        }

        public async Task<List<Clientes>> GetClientes()
        {
            return await GetAll().OrderByDescending(x => x.IdCliente).ToListAsync();
        }

        public async Task<int> UpdateClient(Clientes client)
        {
            int result = await Update(client);

            return result;
        }
    }
}