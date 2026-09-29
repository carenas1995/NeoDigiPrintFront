import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoginInputDto } from '../../dominio/interface/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'authToken';
  private readonly USER_KEY = 'userData';
  private readonly apiUrl = `${environment.urlWebApi}`;

  private logueadoSubject = new BehaviorSubject<boolean>(this.hasToken());
  public logueado$ = this.logueadoSubject.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }

  public hasToken(): boolean {
    return this.cookieService.check(this.TOKEN_KEY);
  }

  public getToken(): string {
    return this.cookieService.get(this.TOKEN_KEY);
  }

  public getUserData(): any {
    const user = this.cookieService.get(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  public login(credentials: LoginInputDto): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/Auth/login', credentials).pipe(
      tap(response => {
        if (response && response.token) {
          this.cookieService.set(this.TOKEN_KEY, response.token, 1, '/');
          this.cookieService.set(this.USER_KEY, JSON.stringify(response.usuario), 1, '/');
          this.logueadoSubject.next(true);
        }
      })
    );
  }

  public logout(): void {
    this.cookieService.delete(this.TOKEN_KEY, '/');
    this.cookieService.delete(this.USER_KEY, '/');
    this.logueadoSubject.next(false);
    this.router.navigate(['/login']);
  }
}