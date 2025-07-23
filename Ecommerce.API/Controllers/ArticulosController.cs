using Ecommerce.Business.Services;
using Ecommerce.Entities;
using Microsoft.AspNetCore.Mvc;
using static Ecommerce.Business.Services.ArticuloService;

namespace Ecommerce.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticulosController : ControllerBase
    {
        private readonly IArticuloService _articuloService;
        public ArticulosController(IArticuloService articuloService)
        {
            _articuloService = articuloService;
        } 
        // GET: api/articulos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Articulo>>> GetAllArticulos()
        {
            try
            {
                var articulos = await _articuloService.GetAllArticulos();
                return Ok(articulos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }
        // GET: api/articulos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Articulo>> GetArticuloById(int id)
        {
            try
            {
                var articulo = await _articuloService.GetArticuloById(id);

                if (articulo == null)
                {
                    return NotFound($"Artículo con ID {id} no encontrado");
                }

                return Ok(articulo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }
        //// POST: api/articulos
        //[HttpPost]
        //public async Task<ActionResult<Articulo>> CreateArticulo([FromBody] Articulo articulo)
        //{
        //    try
        //    {
        //        if (!ModelState.IsValid)
        //        {
        //            return BadRequest(ModelState);
        //        }

        //        await _articuloService.CreateArticulo(articulo);

        //        return CreatedAtAction(nameof(GetArticuloById), new { id = articulo.Id }, articulo);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Error al crear el artículo: {ex.Message}");
        //    }
        //}
        [HttpPost]
        public async Task<ActionResult> CreateArticulo([FromBody] ArticuloCreateDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                await _articuloService.CreateArticulo(dto);

                return Ok(new { message = "Artículo y relación Tienda creados correctamente." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al crear el artículo: {ex.Message}");
            }
        }

        // POST: api/articulos/cliente-articulo
        [HttpPost("cliente-articulo")]
        public async Task<IActionResult> CreateClienteArticulo([FromBody] ClienteArticuloDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                await _articuloService.CreateClienteArticulo(dto);

                return Created("", new { message = "Cliente-Articulo creado correctamente." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al crear ClienteArticulo: {ex.Message}");
            }
        }
        // PUT: api/articulos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateArticulo(int id, [FromBody] Articulo articulo)
        {
            try
            {
                if (id != articulo.Id)
                {
                    return BadRequest("ID del artículo no coincide");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                await _articuloService.UpdateArticulo(articulo);

                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar el artículo: {ex.Message}");
            }
        }

        // DELETE: api/articulos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticulo(int id)
        {
            try
            {
                await _articuloService.DeleteArticulo(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al eliminar el artículo: {ex.Message}");
            }
        }

        // GET: api/articulos/by-tienda/5
        [HttpGet("by-tienda/{tiendaId}")]
        public async Task<ActionResult<IEnumerable<Articulo>>> GetArticulosByTienda(int tiendaId)
        {
            try
            {
                var articulos = await _articuloService.GetArticulosByTienda(tiendaId);
                return Ok(articulos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }
    }
}