namespace Ecommerce.Entities;
public class Tienda
{
    public int Id { get; set; }
    public string Sucursal { get; set; }
    public string Direccion { get; set; }
    public ICollection<ArticuloTienda>? ArticuloTiendas { get; set; }
}
