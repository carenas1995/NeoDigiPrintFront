import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioRepository } from '../../repositorios/UsuarioRepository';
import { UsuarioDto } from '../../interface/auth.interface';
import { UseCase } from '../../base/usecase';

@Injectable({ providedIn: 'root' })
export class ObtenerUsuariosUseCase implements UseCase<void, UsuarioDto[]> {
  constructor(private repository: UsuarioRepository) {}

  execute(): Observable<UsuarioDto[]> {
    return this.repository.listar();
  }
}