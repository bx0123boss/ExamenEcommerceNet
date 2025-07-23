import { Injectable, signal } from '@angular/core';
import { Articulo } from '../../models/articulo';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private items = signal<{ articulo: Articulo; cantidad: number }[]>([]);
  private historial = signal<any[]>([]);
  constructor(private http: HttpClient) {}
  currentItems = this.items.asReadonly();
  currentHistorial = this.historial.asReadonly();

  agregarArticulo(articulo: Articulo, cantidad: number = 1) {
    const itemExistente = this.items().find(
      (item) => item.articulo.id === articulo.id
    );
    console.log('Antes:', this.items());
    if (itemExistente) {
      this.items.update((items) =>
        items.map((item) =>
          item.articulo.id === articulo.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      );
    } else {
      this.items.update((items) => [...items, { articulo, cantidad }]);
    }
    console.log('Después:', this.items());
  }

  eliminarArticulo(id: number) {
    this.items.update((items) =>
      items.filter((item) => item.articulo.id !== id)
    );
  }
  confirmarCompra(clienteId: number, articulosIds: number[]) {
    const requests = articulosIds.map((id) =>
      this.http.post('/api/Articulos/cliente-articulo', {
        clienteId,
        articuloId: id,
      })
    );
    return forkJoin(requests);
  }

  obtenerHistorialPorCliente(clienteId: number) {
    return this.historial().filter((compra) => compra.clienteId === clienteId);
  }

  calcularTotal(): number {
    return this.items().reduce(
      (total, item) => total + item.articulo.precio * item.cantidad,
      0
    );
  }
  clear() {
    this.items.set([]);
  }
}
