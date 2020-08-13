using Ejercicio.DataAccess.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ejercicio.Domain.Repositories
{
    public interface IClientesRepository : IGenericDataRepository<Clientes>
    {
        Task<int> CreateClient(Clientes client);

        Task<List<Clientes>> GetClientes();

        Task<int> UpdateClient(Clientes client);

        Task<int> DeleteClient(Clientes client);
    }
}
