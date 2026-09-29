import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../base/usecase';
import { ConfiguracionGeneralDto } from '../../interface/configuracion.interface';
import { AdminConfigRepository } from '../../repositorios/ConfiguracionRepository';

@Injectable({ providedIn: 'root' })
export class ObtenerGeneralesUseCase implements UseCase<void, ConfiguracionGeneralDto[]> {
  constructor(private repository: AdminConfigRepository) {}

  execute(): Observable<ConfiguracionGeneralDto[]> {
    return this.repository.obtenerGenerales();
  }
}