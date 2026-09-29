import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioRepository } from '../../repositorios/UsuarioRepository';
import { CambiarPasswordDto } from '../../interface/usuario.interface';
import { UseCase } from '../../base/usecase';

@Injectable({ providedIn: 'root' })
export class CambiarPasswordUsuarioUseCase implements UseCase<{ id: number; dto: CambiarPasswordDto }, boolean> {
  constructor(private repository: UsuarioRepository) {}

  execute(params: { id: number; dto: CambiarPasswordDto }): Observable<boolean> {
    return this.repository.cambiarPassword(params.id, params.dto);
  }
}