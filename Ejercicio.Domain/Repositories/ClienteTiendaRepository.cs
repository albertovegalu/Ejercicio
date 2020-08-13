using Ejercicio.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ejercicio.Domain.Repositories
{
    public class ClienteTiendaRepository : GenericDataRepository<ClienteTienda>, IClienteTiendaRepository
    {
        public ClienteTiendaRepository(EjercicioContext context) : base(context)
        {

        }

        public async Task<int> AddClientStore(ClienteTienda clienteTienda)
        {
            int result = await Create(clienteTienda);

            return result;
        }

        public async Task<int> DeleteClientStore(ClienteTienda clienteTienda)
        {
            int result = await Delete(clienteTienda);

            return result;
        }

        public Task<List<ClienteTienda>> GetClientStores()
        {
            return GetAll().ToListAsync();
        }

        public async Task<int> UpdateClientStore(ClienteTienda clienteTienda)
        {
            int result = await Update(clienteTienda);

            return result;
        }
    }
}