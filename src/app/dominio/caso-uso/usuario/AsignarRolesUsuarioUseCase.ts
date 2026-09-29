import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioRepository } from '../../repositorios/UsuarioRepository';
import { UseCase } from '../../base/usecase';

@Injectable({ providedIn: 'root' })
export class AsignarRolesUsuarioUseCase implements UseCase<{ id: number; rolesIds: number[] }, boolean> {
  constructor(private repository: UsuarioRepository) {}

  execute(params: { id: number; rolesIds: number[] }): Observable<boolean> {
    return this.repository.asignarRoles(params.id, params.rolesIds);
  }
}