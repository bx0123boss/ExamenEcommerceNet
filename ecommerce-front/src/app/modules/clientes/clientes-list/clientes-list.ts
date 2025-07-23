import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../../core/services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { NavbarComponent } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  templateUrl: './clientes-list.html',
  styleUrl: './clientes-list.css',
  imports: [NavbarComponent],
})
export class ClientesList implements OnInit {
  clientes = signal<Cliente[]>([]);
  loading = signal(true);
  errorMessage = signal<string | null>(null);
  constructor(private clienteService: ClienteService, public router: Router) {}
  ngOnInit(): void {
    this.loadClientes();
  }
  loadClientes() {
    this.loading.set(true);
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message);
        this.loading.set(false);
      },
    });
  }
  editCliente(id: number): void {
    this.router.navigate(['/clientes/editar', id]);
  }

  deleteCliente(id: number): void {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      this.clienteService.deleteCliente(id).subscribe({
        next: () => {
          this.clientes.update((currentClientes) =>
            currentClientes.filter((c) => c.id !== id)
          );
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar cliente');
        },
      });
    }
  }

  navigateToNewClient() {
    this.router.navigate(['/clientes/nuevo']);
  }
}
