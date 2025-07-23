import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api/Clientes';
  private tokenKey = 'token';
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.loggedIn$.next(this.checkToken());
  }

  isLoggedIn(): boolean {
    return this.checkToken();
  }

  isAuthenticated(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  private checkToken(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(this.tokenKey);
  }

  login(credentials: { name: string }) {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((resp) => {
          localStorage.setItem(this.tokenKey, resp.token);
          this.loggedIn$.next(true);
        }),
        catchError((error) => {
          console.error('Error completo:', error);
          throw error;
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.tokenKey);
  }
}
