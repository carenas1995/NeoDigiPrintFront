import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../base/usecase';
import { AdminConfigRepository } from '../../repositorios/ConfiguracionRepository';

@Injectable({ providedIn: 'root' })
export class DesactivarModoUseCase implements UseCase<number, boolean> {
  constructor(private repository: AdminConfigRepository) {}

  execute(id: number): Observable<boolean> {
    return this.repository.desactivarModo(id);
  }
}