using Ecommerce.Business.Services;
using Ecommerce.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.API.Controllers;
[ApiController]
[Route("api/[controller]")]
public class TiendasController : ControllerBase
{
    private readonly ITiendaService _tiendaService;
    private readonly IArticuloService _articuloService;

    public TiendasController(
        ITiendaService tiendaService,
        IArticuloService articuloService)
    {
        _tiendaService = tiendaService;
        _articuloService = articuloService;
    }

    // GET: api/tiendas
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Tienda>>> GetAllTiendas()
    {
        try
        {
            var tiendas = await _tiendaService.GetAllTiendas();
            return Ok(tiendas);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    // GET: api/tiendas/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Tienda>> GetTiendaById(int id)
    {
        try
        {
            var tienda = await _tiendaService.GetTiendaById(id);

            if (tienda == null)
            {
                return NotFound($"Tienda con ID {id} no encontrada");
            }

            return Ok(tienda);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    // POST: api/tiendas
    [HttpPost]
    public async Task<ActionResult<Tienda>> CreateTienda([FromBody] Tienda tienda)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _tiendaService.CreateTienda(tienda);

            return CreatedAtAction(nameof(GetTiendaById), new { id = tienda.Id }, tienda);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error al crear la tienda: {ex.Message}");
        }
    }

    // PUT: api/tiendas/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTienda(int id, [FromBody] Tienda tienda)
    {
        try
        {
            if (id != tienda.Id)
            {
                return BadRequest("ID de la tienda no coincide");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _tiendaService.UpdateTienda(tienda);

            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error al actualizar la tienda: {ex.Message}");
        }
    }

    // DELETE: api/tiendas/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTienda(int id)
    {
        try
        {
            await _tiendaService.DeleteTienda(id);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error al eliminar la tienda: {ex.Message}");
        }
    }

    // POST: api/tiendas/5/articulos/10 (Agregar artículo a tienda)
    [HttpPost("{tiendaId}/articulos/{articuloId}")]
    public async Task<IActionResult> AddArticuloToTienda(
        [FromRoute] int tiendaId,
        [FromRoute] int articuloId,
        [FromBody] DateTime? fecha = null)
    {
        try
        {
            var tienda = await _tiendaService.GetTiendaById(tiendaId);
            var articulo = await _articuloService.GetArticuloById(articuloId);

            if (tienda == null || articulo == null)
            {
                return NotFound("Tienda o artículo no encontrado");
            }

            // Implementar lógica para agregar relación (ejemplo básico)
            tienda.ArticuloTiendas ??= new List<ArticuloTienda>();
            tienda.ArticuloTiendas.Add(new ArticuloTienda
            {
                ArticuloId = articuloId,
                TiendaId = tiendaId,
                Fecha = fecha ?? DateTime.Now
            });

            await _tiendaService.UpdateTienda(tienda);

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error al agregar artículo a tienda: {ex.Message}");
        }
    }

    // GET: api/tiendas/5/articulos (Obtener artículos de una tienda)
    [HttpGet("{id}/articulos")]
    public async Task<ActionResult<IEnumerable<Articulo>>> GetArticulosByTienda(int id)
    {
        try
        {
            var articulos = await _articuloService.GetArticulosByTienda(id);
            return Ok(articulos);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }
}