import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogoRepository } from '../../repositorios/CatalogoRepository';
import { PresentacionDto } from '../../interface/producto.interface';
import { UseCase } from '../../base/usecase';

@Injectable({ providedIn: 'root' })
export class GuardarPresentacionUseCase implements UseCase<PresentacionDto, PresentacionDto> {
  constructor(private repository: CatalogoRepository) {}

  execute(dto: PresentacionDto): Observable<PresentacionDto> {
    return this.repository.guardarPresentacion(dto);
  }
}
