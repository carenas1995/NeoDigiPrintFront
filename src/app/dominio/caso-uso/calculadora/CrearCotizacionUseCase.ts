import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalculadoraRepository } from '../../repositorios/CalculadoraRepository';
import { UseCase } from '../../base/usecase';
import { CalcularCotizacionDto, CotizacionGuardadaDto } from '../../interface/cotizacion.interface';

@Injectable({
  providedIn: 'root'
})
export class CrearCotizacionUseCase implements UseCase<CalcularCotizacionDto, CotizacionGuardadaDto> {
  constructor(private repository: CalculadoraRepository) {}

  execute(input: CalcularCotizacionDto): Observable<CotizacionGuardadaDto> {
    return this.repository.crear(input);
  }
}