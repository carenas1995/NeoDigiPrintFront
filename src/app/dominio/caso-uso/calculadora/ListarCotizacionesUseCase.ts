import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalculadoraRepository } from '../../repositorios/CalculadoraRepository';
import { UseCase } from '../../base/usecase';
import { CotizacionResumenDto } from '../../interface/cotizacion.interface';

@Injectable({
  providedIn: 'root'
})
export class ListarCotizacionesUseCase implements UseCase<void, CotizacionResumenDto[]> {
  constructor(private repository: CalculadoraRepository) {}

  execute(): Observable<CotizacionResumenDto[]> {
    return this.repository.listar();
  }
}