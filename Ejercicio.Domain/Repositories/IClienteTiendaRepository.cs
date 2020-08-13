using Ejercicio.DataAccess.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ejercicio.Domain.Repositories
{
    public interface IClienteTiendaRepository : IGenericDataRepository<ClienteTienda>
    {
        Task<int> AddClientStore(ClienteTienda clienteTienda);

        Task<int> UpdateClientStore(ClienteTienda clienteTienda);

        Task<int> DeleteClientStore(ClienteTienda clienteTienda);

        Task<List<ClienteTienda>> GetClientStores();
    }
}