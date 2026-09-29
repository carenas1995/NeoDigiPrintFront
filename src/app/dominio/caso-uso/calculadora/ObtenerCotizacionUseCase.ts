import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalculadoraRepository } from '../../repositorios/CalculadoraRepository';
import { UseCase } from '../../base/usecase';
import { CotizacionDto } from '../../interface/cotizacion.interface';

@Injectable({
  providedIn: 'root'
})
export class ObtenerCotizacionUseCase implements UseCase<number, CotizacionDto> {
  constructor(private repository: CalculadoraRepository) {}

  execute(id: number): Observable<CotizacionDto> {
    return this.repository.obtener(id);
  }
}