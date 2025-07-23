import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TiendaService } from '../../../core/services/tiendas.service';
import { Tienda } from '../../../models/tienda';
import { NavbarComponent } from '../../../shared/navbar/navbar';
@Component({
  selector: 'app-tiendas-list',
  standalone: true,
  templateUrl: './tiendas-list.html',
  styleUrl: './tiendas-list.css',
  imports: [NavbarComponent],
})
export class TiendasList implements OnInit {
  tiendas = signal<Tienda[]>([]);
  loading = signal(true);
  errorMessage = signal<string | null>(null);
  constructor(private tiendasService: TiendaService, public router: Router) {}
  ngOnInit(): void {
    this.loadTiendas();
  }
  loadTiendas() {
    this.loading.set(true);
    this.tiendasService.getTiendas().subscribe({
      next: (data) => {
        this.tiendas.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message);
        this.loading.set(false);
      },
    });
  }
  editTienda(id: number): void {
    this.router.navigate(['/Tiendas/editar', id]);
  }

  deleteTienda(id: number): void {
    if (confirm('¿Está seguro de eliminar este Tienda?')) {
      this.tiendasService.deleteTienda(id).subscribe({
        next: () => {
          this.tiendas.update((currentTiendas) =>
            currentTiendas.filter((c) => c.id !== id)
          );
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar Tienda');
        },
      });
    }
  }

  navigateToNewStore() {
    this.router.navigate(['/tiendas/nuevo']);
  }
}
