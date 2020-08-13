using Ejercicio.DataAccess.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ejercicio.Domain.Repositories
{
    public interface ITiendaRepository: IGenericDataRepository<Tienda>
    {
        Task<int> AddStore(Tienda tienda);

        Task<List<Tienda>> GetStores();

        Task<int> UpdateStore(Tienda tienda);

        Task<int> DeleteStore(Tienda tienda);
    }
}