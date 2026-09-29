import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioRepository } from '../../repositorios/UsuarioRepository';
import { ActualizarUsuarioDto } from '../../interface/usuario.interface';
import { UseCase } from '../../base/usecase';

@Injectable({ providedIn: 'root' })
export class ActualizarUsuarioUseCase implements UseCase<{ id: number; dto: ActualizarUsuarioDto }, boolean> {
  constructor(private repository: UsuarioRepository) {}

  execute(params: { id: number; dto: ActualizarUsuarioDto }): Observable<boolean> {
    return this.repository.actualizar(params.id, params.dto);
  }
}