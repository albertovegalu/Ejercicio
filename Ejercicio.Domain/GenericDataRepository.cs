using Ejercicio.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Ejercicio.Domain
{
    public class GenericDataRepository<T> : IGenericDataRepository<T> where T : class
    {
        private readonly EjercicioContext _context;

        public GenericDataRepository(EjercicioContext context)
        {
            _context = context;
            _context.Set<T>();
        }

        public async Task<int> Create(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            int result = await _context.SaveChangesAsync();

            return result;
        }

        public async Task<int> Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
            int result = await _context.SaveChangesAsync();

            return result;
        }

        public IQueryable<T> GetAll()
        {
            return _context.Set<T>().AsNoTracking();
        }

        public async Task<T> GetById(int id)
        {
            return await _context.Set<T>()
                .AsNoTracking()
                .FirstAsync();
        }

        public async Task<int> Update(T entity)
        {
            _context.Set<T>().Update(entity);
            int result = await _context.SaveChangesAsync();

            return result;
        }
    }
}