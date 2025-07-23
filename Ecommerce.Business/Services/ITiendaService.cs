using Ecommerce.Entities;
namespace Ecommerce.Business.Services;
public interface ITiendaService
{
    Task<List<Tienda>> GetAllTiendas();
    Task<Tienda> GetTiendaById(int id);
    Task CreateTienda(Tienda tienda);
    Task UpdateTienda(Tienda tienda);
    Task DeleteTienda(int id);
}