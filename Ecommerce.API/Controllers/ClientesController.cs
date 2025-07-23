using Ecommerce.Business.Services;
using Ecommerce.Entities;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.API.Controllers;
[ApiController]
[Route("api/[controller]")]
public class ClientesController : ControllerBase
{
    private readonly IClienteService _clienteService;

    public ClientesController(IClienteService clienteService)
    {
        _clienteService = clienteService;
    }

    // GET: api/clientes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cliente>>> GetAllClientes()
    {
        try
        {
            var clientes = await _clienteService.GetAllClientes();
            return Ok(clientes);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    // GET: api/clientes/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Cliente>> GetClienteById(int id)
    {
        try
        {
            var cliente = await _clienteService.GetClienteById(id);

            if (cliente == null)
            {
                return NotFound($"Cliente con ID {id} no encontrado");
            }

            return Ok(cliente);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    // POST: api/clientes
    [HttpPost]
    public async Task<ActionResult<Cliente>> CreateCliente([FromBody] Cliente cliente)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _clienteService.CreateCliente(cliente);

            return CreatedAtAction(nameof(GetClienteById), new { id = cliente.Id }, cliente);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error al crear el cliente: {ex.Message}");
        }
    }

    // PUT: api/clientes/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCliente(int id, [FromBody] Cliente cliente)
    {
        try
        {
            if (id != cliente.Id)
            {
                return BadRequest("ID del cliente no coincide");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _clienteService.UpdateCliente(cliente);

            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error al actualizar el cliente: {ex.Message}");
        }
    }

    // DELETE: api/clientes/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCliente(int id)
    {
        try
        {
            await _clienteService.DeleteCliente(id);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error al eliminar el cliente: {ex.Message}");
        }
    }

    // GET: api/clientes/by-articulo/5
    [HttpGet("by-articulo/{articuloId}")]
    public async Task<ActionResult<IEnumerable<Cliente>>> GetClientesByArticulo(int articuloId)
    {
        try
        {
            return Ok(new List<Cliente>()); // Placeholder
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request) 
    {
        try
        {
            var cliente = await _clienteService.GetByNameForLogin(request.Nombre);

            if (cliente == null)
            {
                return NotFound($"Cliente con nombre {request.Nombre} no encontrado");
            }

            var token = Guid.NewGuid().ToString(); 

            return Ok(new { Token = token }); 
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    public class LoginRequest
    {
        public string Nombre { get; set; } 
    }
}
