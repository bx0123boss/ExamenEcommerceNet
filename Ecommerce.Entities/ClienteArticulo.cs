namespace Ecommerce.Entities;
public class ClienteArticulo
{
    public int ClienteId { get; set; }
    public Cliente Cliente { get; set; }
    public int ArticuloId { get; set; }
    public Articulo Articulo { get; set; }
    public DateTime Fecha { get; set; }
}