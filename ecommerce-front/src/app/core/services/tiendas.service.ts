import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap, throwError } from 'rxjs';
import { Tienda } from '../../models/tienda';
@Injectable({
  providedIn: 'root',
})
export class TiendaService {
  private apiUrl = '/api/Tiendas';

  constructor(private http: HttpClient) {}

  getTiendas(): Observable<Tienda[]> {
    console.log('Realizando petición a:', this.apiUrl);
    return this.http.get<Tienda[]>(this.apiUrl).pipe(
      tap((data) => console.log('Datos recibidos:', data)),
      catchError((error) => {
        console.error('Error en getClientes:', error);
        return throwError(() => error);
      })
    );
  }
  createTienda(tienda: Tienda): Observable<Tienda> {
    return this.http.post<Tienda>(this.apiUrl, tienda);
  }
  updateTienda(tienda: Tienda): Observable<Tienda> {
    return this.http.put<Tienda>(this.apiUrl, tienda);
  }
  deleteTienda(id: number) {
    return this.http.delete<Tienda>(`${this.apiUrl}/${id}`);
  }
}
