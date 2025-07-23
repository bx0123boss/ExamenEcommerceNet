import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../core/services/carrito.service';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../core/services/cliente.service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  items;
  clientes = signal<Cliente[]>([]);
  selectedClienteId = signal<number | null>(null);
  constructor(
    public carritoService: CarritoService,
    private clienteService: ClienteService
  ) {
    this.items = this.carritoService.currentItems;
  }
  ngOnInit(): void {
    this.loadClientes();
  }
  loadClientes() {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes.set(data);
      },
      error: (err) => {},
    });
  }
  get total() {
    return this.carritoService.calcularTotal();
  }
  onClienteChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedClienteId.set(value ? Number(value) : null);
  }
  eliminarArticulo(id: number) {
    this.carritoService.eliminarArticulo(id);
  }
  confirmarCompra() {
    const clienteId = this.selectedClienteId();
    if (!clienteId) {
      alert('Seleccione un cliente.');
      return;
    }

    const carritoItems = this.items();
    if (carritoItems.length === 0) {
      alert('No hay artículos en el carrito.');
      return;
    }

    const articulosIds = carritoItems
      .map((item) => item.articulo.id)
      .filter((id): id is number => id !== undefined);

    this.carritoService.confirmarCompra(clienteId, articulosIds).subscribe({
      next: (response) => {
        alert('Compra registrada correctamente.');
        this.carritoService.clear();
      },
      error: (err) => {
        console.error('Error al registrar compra:', err);
        alert('Error al confirmar compra.');
      },
    });
  }
}
