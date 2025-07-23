using Ecommerce.Entities;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Data;
public class EcommerceContext : DbContext
{
    public EcommerceContext(DbContextOptions<EcommerceContext> options) : base(options) { }

    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Tienda> Tiendas { get; set; }
    public DbSet<Articulo> Articulos { get; set; }
    public DbSet<ArticuloTienda> ArticuloTiendas { get; set; }
    public DbSet<ClienteArticulo> ClienteArticulos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ArticuloTienda>()
            .HasKey(at => new { at.ArticuloId, at.TiendaId });

        modelBuilder.Entity<ClienteArticulo>()
            .HasKey(ca => new { ca.ClienteId, ca.ArticuloId });

        modelBuilder.Entity<Cliente>()
            .HasMany(c => c.ClienteArticulos)
            .WithOne(ca => ca.Cliente)
            .IsRequired(false);

        modelBuilder.Entity<Articulo>()
            .HasMany(a => a.ClienteArticulos)
            .WithOne(ca => ca.Articulo)
            .IsRequired(false);

        modelBuilder.Entity<Tienda>()
            .HasMany(t => t.ArticuloTiendas)
            .WithOne(at => at.Tienda)
            .IsRequired(false);

        modelBuilder.Entity<Articulo>()
            .HasMany(a => a.ArticuloTiendas)
            .WithOne(at => at.Articulo)
            .IsRequired(false);

        modelBuilder.Entity<Articulo>()
            .Property(a => a.Precio)
            .HasPrecision(18, 2); 

        modelBuilder.Entity<ClienteArticulo>()
            .HasOne(ca => ca.Cliente)
            .WithMany(c => c.ClienteArticulos)
            .OnDelete(DeleteBehavior.ClientCascade);

        modelBuilder.Entity<ArticuloTienda>()
            .HasOne(at => at.Articulo)
            .WithMany(a => a.ArticuloTiendas)
            .OnDelete(DeleteBehavior.ClientCascade);
    }
}