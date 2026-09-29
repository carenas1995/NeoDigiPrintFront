import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalculadoraRepository } from '../../repositorios/CalculadoraRepository';
import { UseCase } from '../../base/usecase';

export interface AsignarDomicilioParams {
  id: number;
  costoDomicilio: number;
}

@Injectable({
  providedIn: 'root'
})
export class AsignarCostoDomicilioUseCase implements UseCase<AsignarDomicilioParams, boolean> {
  constructor(private repository: CalculadoraRepository) {}

  execute(params: AsignarDomicilioParams): Observable<boolean> {
    return this.repository.asignarCostoDomicilio(params.id, params.costoDomicilio);
  }
}