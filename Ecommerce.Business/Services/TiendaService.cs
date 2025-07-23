using Ecommerce.Data;
using Ecommerce.Entities;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Business.Services;

public class TiendaService : ITiendaService
{
    private readonly EcommerceContext _context;

    public TiendaService(EcommerceContext context)
    {
        _context = context;
    }

    public async Task<List<Tienda>> GetAllTiendas()
    {
        return await _context.Tiendas.ToListAsync();
    }

    public async Task<Tienda> GetTiendaById(int id)
    {
        return await _context.Tiendas
            .Include(t => t.ArticuloTiendas)
            .ThenInclude(at => at.Articulo)
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task CreateTienda(Tienda tienda)
    {
        await _context.Tiendas.AddAsync(tienda);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateTienda(Tienda tienda)
    {
        _context.Entry(tienda).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteTienda(int id)
    {
        var tienda = await _context.Tiendas.FindAsync(id);
        if (tienda != null)
        {
            _context.Tiendas.Remove(tienda);
            await _context.SaveChangesAsync();
        }
    }
}