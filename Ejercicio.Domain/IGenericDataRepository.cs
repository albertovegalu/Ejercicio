using System.Linq;
using System.Threading.Tasks;

namespace Ejercicio.Domain
{
    public interface IGenericDataRepository<T> where T : class
    {
        IQueryable<T> GetAll();

        Task<int> Create(T entity);

        Task<int> Update(T entity);

        Task<int> Delete(T entity);
    }
}