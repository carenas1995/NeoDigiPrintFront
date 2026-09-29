import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../base/usecase';
import { ConfiguracionGeneralDto } from '../../interface/configuracion.interface';
import { AdminConfigRepository } from '../../repositorios/ConfiguracionRepository';

@Injectable({ providedIn: 'root' })
export class GuardarGeneralUseCase implements UseCase<ConfiguracionGeneralDto, ConfiguracionGeneralDto> {
  constructor(private repository: AdminConfigRepository) {}

  execute(dto: ConfiguracionGeneralDto): Observable<ConfiguracionGeneralDto> {
    return this.repository.guardarGeneral(dto);
  }
}