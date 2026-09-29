import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../base/usecase';
import { MotorCalculoDto } from '../../interface/servicio-catalogos.interface';
import { AdminConfigRepository } from '../../repositorios/ConfiguracionRepository';

@Injectable({
  providedIn: 'root'
})
export class ObtenerMotoresUseCase implements UseCase<void, MotorCalculoDto[]> {
  constructor(private repository: AdminConfigRepository) {}

  execute(): Observable<MotorCalculoDto[]> {
    return this.repository.obtenerMotores();
  }
}