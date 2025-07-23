using Ecommerce.Data;
using Ecommerce.Entities;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Business.Services
{
    public class ArticuloService : IArticuloService
    {
        private readonly EcommerceContext _context;
        public ArticuloService(EcommerceContext context)
        {
            _context = context;
        }
        /*
        public async Task CreateArticulo(Articulo articulo)
        {
            await _context.Articulos.AddAsync(articulo);
            await _context.SaveChangesAsync();
        }*/
        public async Task CreateArticulo(ArticuloCreateDto dto)
        {
            var articulo = new Articulo
            {
                Codigo = dto.Codigo,
                Descripcion = dto.Descripcion,
                Precio = dto.Precio,
                Imagen = dto.Imagen,
                Stock = dto.Stock
            };

            await _context.Articulos.AddAsync(articulo);
            await _context.SaveChangesAsync(); 

            var articuloTienda = new ArticuloTienda
            {
                ArticuloId = articulo.Id,
                TiendaId = dto.TiendaId,
                Fecha = DateTime.UtcNow
            };

            await _context.ArticuloTiendas.AddAsync(articuloTienda);
            await _context.SaveChangesAsync();
        }


        public async Task DeleteArticulo(int id)
        {
            var articulo = await _context.Articulos.FindAsync(id);
            if (articulo != null)
            {
                _context.Articulos.Remove(articulo);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Articulo>> GetAllArticulos()
        {
            return await _context.Articulos.ToListAsync();
        }

        public async Task<Articulo> GetArticuloById(int id)
        {
            return await _context.Articulos
                .Include(a => a.ArticuloTiendas)
                .ThenInclude(at => at.Tienda)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<List<Articulo>> GetArticulosByTienda(int tiendaId)
        {
            return await _context.Articulos.ToListAsync();
        }

        public async Task UpdateArticulo(Articulo articulo)
        {
            _context.Entry(articulo).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task CreateClienteArticulo(ClienteArticuloDto dto)
        {
            var clienteArticulo = new ClienteArticulo
            {
                ClienteId = dto.ClienteId,
                ArticuloId = dto.ArticuloId,
                Fecha = DateTime.UtcNow
            };

            _context.ClienteArticulos.Add(clienteArticulo);
            await _context.SaveChangesAsync();
        }
        public class ClienteArticuloDto
        {
            public int ClienteId { get; set; }
            public int ArticuloId { get; set; }
        }
        public class ArticuloCreateDto
        {
            public string Codigo { get; set; }
            public string Descripcion { get; set; }
            public decimal Precio { get; set; }
            public string Imagen { get; set; }
            public int Stock { get; set; }
            public int TiendaId { get; set; }
        }

    }
}
