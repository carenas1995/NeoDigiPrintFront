import { Observable } from 'rxjs';
import { UsuarioDto } from '../interface/auth.interface';
import { CrearUsuarioDto, ActualizarUsuarioDto, CambiarPasswordDto } from '../interface/usuario.interface';

export abstract class UsuarioRepository {
  abstract listar(): Observable<UsuarioDto[]>;
  abstract obtenerPorId(id: number): Observable<UsuarioDto>;
  abstract crear(dto: CrearUsuarioDto): Observable<{ id: number }>;
  abstract actualizar(id: number, dto: ActualizarUsuarioDto): Observable<any>;
  abstract cambiarEstado(id: number, activo: boolean): Observable<any>;
  abstract cambiarPassword(id: number, dto: CambiarPasswordDto): Observable<any>;
  abstract asignarRoles(id: number, roles: number[]): Observable<any>;
}