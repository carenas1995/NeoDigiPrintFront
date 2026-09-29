import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioRepository } from '../../repositorios/UsuarioRepository';
import { UseCase } from '../../base/usecase';

@Injectable({ providedIn: 'root' })
export class CambiarEstadoUsuarioUseCase implements UseCase<{ id: number; activo: boolean }, boolean> {
  constructor(private repository: UsuarioRepository) {}

  execute(params: { id: number; activo: boolean }): Observable<boolean> {
    return this.repository.cambiarEstado(params.id, params.activo);
  }
}