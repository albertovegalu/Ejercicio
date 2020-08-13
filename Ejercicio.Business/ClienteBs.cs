using Ejercicio.DataAccess.Models;
using Ejercicio.Domain.Repositories;
using System.Collections.Generic;

namespace Ejercicio.Business
{
    public class ClienteBs
    {
        private readonly IClientesRepository _repository;

        public ClienteBs(IClientesRepository repository)
        {
            _repository = repository;
        }

        

        public IList<Clientes> GetAllClients()
        {
            List<Clientes> clients = (List<Clientes>)_repository.GetAll();

            return clients;
        }
    }
}