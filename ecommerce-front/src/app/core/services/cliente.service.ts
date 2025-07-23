import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap, throwError } from 'rxjs';
import { Cliente } from '../../models/cliente';
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = '/api/clientes';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    console.log('Realizando petición a:', this.apiUrl);
    return this.http.get<Cliente[]>(this.apiUrl).pipe(
      tap((data) => console.log('Datos recibidos:', data)),
      catchError((error) => {
        console.error('Error en getClientes:', error);
        return throwError(() => error);
      })
    );
  }
  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }
  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.apiUrl, cliente);
  }
  deleteCliente(id: number) {
    return this.http.delete<Cliente>(`${this.apiUrl}/${id}`);
  }
}
