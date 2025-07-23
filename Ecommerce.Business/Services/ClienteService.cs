using Ecommerce.Data;
using Ecommerce.Entities;
using Microsoft.EntityFrameworkCore;
namespace Ecommerce.Business.Services;
public class ClienteService : IClienteService
{
    private readonly EcommerceContext _context;

    public ClienteService(EcommerceContext context)
    {
        _context = context;
    }

    public async Task CreateCliente(Cliente cliente)
    {
        await _context.Clientes.AddAsync(cliente);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteCliente(int id)
    {
        var cliente = await _context.Clientes.FindAsync(id);
        if (cliente != null)
        {
            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<Cliente>> GetAllClientes()
    {
        return await _context.Clientes.ToListAsync();
    }

    public Task<Cliente> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<Cliente?> GetByNameForLogin(string name)
    {
        return await _context.Clientes
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Nombre == name);
    }

    public async Task<Cliente> GetClienteById(int id)
    {
        return await _context.Clientes.FindAsync(id);
    }

    public async Task UpdateCliente(Cliente cliente)
    {
        _context.Entry(cliente).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }
}