using Ecommerce.Entities;
using static Ecommerce.Business.Services.ArticuloService;
namespace Ecommerce.Business.Services;
public interface IArticuloService
{
    Task<List<Articulo>> GetAllArticulos();
    Task<Articulo> GetArticuloById(int id);
    //Task CreateArticulo(Articulo articulo);
    Task CreateArticulo(ArticuloCreateDto dto);
    Task UpdateArticulo(Articulo articulo);
    Task DeleteArticulo(int id);
    Task<List<Articulo>> GetArticulosByTienda(int tiendaId);
    Task CreateClienteArticulo(ClienteArticuloDto dto);
}