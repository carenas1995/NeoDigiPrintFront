import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogoRepository } from '../../repositorios/CatalogoRepository';
import { ServicioDto } from '../../interface/servicio-catalogos.interface';
import { UseCase } from '../../base/usecase';

@Injectable({ providedIn: 'root' })
export class GuardarServicioUseCase implements UseCase<ServicioDto, ServicioDto> {
  constructor(private repository: CatalogoRepository) {}

  execute(dto: ServicioDto): Observable<ServicioDto> {
    return this.repository.guardarServicio(dto);
  }
}