using Ecommerce.Entities;

namespace Ecommerce.Business.Services;
public interface IClienteService
{
    Task<IEnumerable<Cliente>> GetAllClientes();
    Task<Cliente> GetClienteById(int id);
    Task CreateCliente(Cliente cliente);
    Task UpdateCliente(Cliente cliente);
    Task DeleteCliente(int id);
    Task<Cliente> GetByIdAsync(int id);
    Task<Cliente> GetByNameForLogin(string name);
}