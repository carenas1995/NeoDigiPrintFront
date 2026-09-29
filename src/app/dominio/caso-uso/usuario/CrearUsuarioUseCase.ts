import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioRepository } from '../../repositorios/UsuarioRepository';
import { CrearUsuarioDto } from '../../interface/usuario.interface';
import { UseCase } from '../../base/usecase';

@Injectable({ providedIn: 'root' })
export class CrearUsuarioUseCase implements UseCase<CrearUsuarioDto, { id: number }> {
  constructor(private repository: UsuarioRepository) {}

  execute(dto: CrearUsuarioDto): Observable<{ id: number }> {
    return this.repository.crear(dto);
  }
}