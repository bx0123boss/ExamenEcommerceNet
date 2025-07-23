import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Articulo } from '../../models/articulo';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
  private apiUrl = '/api/Articulos';
  constructor(private http: HttpClient) {}

  getArticulos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  createArticulo(articulo: Articulo): Observable<Articulo> {
    return this.http.post<Articulo>(this.apiUrl, articulo);
  }
  addToCart(articuloId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/carrito`, { articuloId });
  }
  deleteArticulo(id: number) {
    return this.http.delete<Articulo>(`${this.apiUrl}/${id}`);
  }
  updateArticulo(articulo: Articulo): Observable<Articulo> {
    return this.http.put<Articulo>(this.apiUrl, articulo);
  }
}
