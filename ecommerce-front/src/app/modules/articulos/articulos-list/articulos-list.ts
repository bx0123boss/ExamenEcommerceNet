import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../shared/navbar/navbar";
import { Articulo } from '../../../models/articulo';
import { ArticuloService } from '../../../core/services/articulo.service';
import { Router } from '@angular/router';
import { CarritoService } from '../../../core/services/carrito.service';
@Component({
  selector: 'app-articulos-list',
  standalone: true,
  templateUrl: './articulos-list.html',
  styleUrl: './articulos-list.css',
  imports: [NavbarComponent, CommonModule]
})
export class ArticulosList implements OnInit {
  articulos= signal<Articulo[]>([]);
  loading = signal(true);
  errorMessage = signal<string | null>(null);
   constructor(
    private articuloService: ArticuloService,
    private carritoService: CarritoService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.loadArticulos();
  }
  
  loadArticulos() {
  this.loading.set(true);
  this.articuloService.getArticulos().subscribe({
    next: (data) => {
      this.articulos.set(data);
      this.loading.set(false);
    },
    error: (err) => {
      this.errorMessage.set(err.message);
      this.loading.set(false);
    }
  });
  }
 addToCart(articulo: Articulo) {
  console.log(articulo)
    this.carritoService.agregarArticulo(articulo, 1);
  }

  editArticulo(id: number): void {
    
    this.router.navigate(['/articulos/editar', id]);
  }
  
   deleteArticulo(id: number): void {
    if (confirm('¿Está seguro de eliminar este articulo?')) {
      this.articuloService.deleteArticulo(id).subscribe({
        next: () => {
          this.articulos.update(currentarticulos => 
            currentarticulos.filter(c => c.id !== id)
          );
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar cliente');
        }
      });
    }
  }
  
  navigateToNewArticle() {
    this.router.navigate(['/articulos/nuevo']);
  }
}