import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../base/usecase';
import { ConfiguracionEmpresaDto } from '../../interface/configuracion.interface';
import { AdminConfigRepository } from '../../repositorios/ConfiguracionRepository';

@Injectable({
  providedIn: 'root'
})
export class GuardarEmpresaUseCase implements UseCase<ConfiguracionEmpresaDto, ConfiguracionEmpresaDto> {
  constructor(private repository: AdminConfigRepository) {}

  execute(dto: ConfiguracionEmpresaDto): Observable<ConfiguracionEmpresaDto> {
    return this.repository.guardarEmpresa(dto);
  }
}