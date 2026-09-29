import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../base/usecase';
import { ModoCalculoDto } from '../../interface/servicio-catalogos.interface';
import { AdminConfigRepository } from '../../repositorios/ConfiguracionRepository';

@Injectable({ providedIn: 'root' })
export class ObtenerModosUseCase implements UseCase<{}, ModoCalculoDto[]> {
  constructor(private repository: AdminConfigRepository) {}

  execute(): Observable<ModoCalculoDto[]> {
    return this.repository.obtenerModos();
  }
}