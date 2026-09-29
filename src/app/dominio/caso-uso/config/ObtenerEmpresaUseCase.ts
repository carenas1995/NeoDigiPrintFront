import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../base/usecase';
import { ConfiguracionEmpresaDto } from '../../interface/configuracion.interface';
import { AdminConfigRepository } from '../../repositorios/ConfiguracionRepository';

@Injectable({
  providedIn: 'root'
})
export class ObtenerEmpresaUseCase implements UseCase<void, ConfiguracionEmpresaDto> {
  constructor(private repository: AdminConfigRepository) {}

  execute(): Observable<ConfiguracionEmpresaDto> {
    return this.repository.obtenerEmpresa();
  }
}