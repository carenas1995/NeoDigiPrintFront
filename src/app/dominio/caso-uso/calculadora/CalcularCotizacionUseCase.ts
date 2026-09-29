import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalculadoraRepository } from '../../repositorios/CalculadoraRepository';
import { UseCase } from '../../base/usecase';
import { CalcularCotizacionDto, CotizacionResultadoCalculoDto } from '../../interface/cotizacion.interface';

@Injectable({
  providedIn: 'root'
})
export class CalcularCotizacionUseCase implements UseCase<CalcularCotizacionDto, CotizacionResultadoCalculoDto> {
  constructor(private repository: CalculadoraRepository) {}

  execute(params: CalcularCotizacionDto): Observable<CotizacionResultadoCalculoDto> {
    return this.repository.calcular(params);
  }
}