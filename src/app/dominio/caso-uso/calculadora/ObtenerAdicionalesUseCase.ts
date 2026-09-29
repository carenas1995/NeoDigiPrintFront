import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalculadoraRepository } from '../../repositorios/CalculadoraRepository';
import { UseCase } from '../../base/usecase';

@Injectable({
  providedIn: 'root'
})
export class ObtenerAdicionalesUseCase implements UseCase<number, any[]> {
  constructor(private repository: CalculadoraRepository) {}

  execute(servicioId: number): Observable<any[]> {
    return this.repository.obtenerAdicionales(servicioId);
  }
}