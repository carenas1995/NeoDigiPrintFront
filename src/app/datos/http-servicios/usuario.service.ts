import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UsuarioRepository } from '../../dominio/repositorios/UsuarioRepository';
import { UsuarioDto } from '../../dominio/interface/auth.interface';
import { CrearUsuarioDto, ActualizarUsuarioDto, CambiarPasswordDto } from '../../dominio/interface/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements UsuarioRepository {
  private readonly apiUrl = `${environment.urlWebApi}/Usuarios`; // Ruta C#

  constructor(private http: HttpClient) {}

  listar(): Observable<UsuarioDto[]> {
    return this.http.get<UsuarioDto[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<UsuarioDto> {
    return this.http.get<UsuarioDto>(`${this.apiUrl}/${id}`);
  }

  crear(dto: CrearUsuarioDto): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.apiUrl, dto);
  }

  actualizar(id: number, dto: ActualizarUsuarioDto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, dto);
  }

  cambiarEstado(id: number, activo: boolean): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/estado`, activo, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  cambiarPassword(id: number, dto: CambiarPasswordDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/cambiar-password`, dto);
  }

  asignarRoles(id: number, roles: number[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/roles`, roles);
  }
}