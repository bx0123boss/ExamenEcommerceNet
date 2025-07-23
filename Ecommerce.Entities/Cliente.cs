
namespace Ecommerce.Entities;
public class Cliente
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Apellidos { get; set; }
    public string Direccion { get; set; }
    public ICollection<ClienteArticulo>? ClienteArticulos { get; set; }
}
