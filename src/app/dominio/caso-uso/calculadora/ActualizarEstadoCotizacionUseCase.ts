import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalculadoraRepository } from '../../repositorios/CalculadoraRepository';
import { UseCase } from '../../base/usecase';

export interface ActualizarEstadoParams {
  id: number;
  nuevoEstado: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActualizarEstadoCotizacionUseCase implements UseCase<ActualizarEstadoParams, boolean> {
  constructor(private repository: CalculadoraRepository) {}

  execute(params: ActualizarEstadoParams): Observable<boolean> {
    return this.repository.actualizarEstado(params.id, params.nuevoEstado);
  }
}