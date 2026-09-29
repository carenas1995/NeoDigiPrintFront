import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogoRepository } from '../../repositorios/CatalogoRepository';
import { MaterialVarianteDto } from '../../interface/material.interface';
import { UseCase } from '../../base/usecase';

@Injectable({ providedIn: 'root' })
export class GuardarVarianteUseCase implements UseCase<MaterialVarianteDto, MaterialVarianteDto> {
  constructor(private repository: CatalogoRepository) {}

  execute(dto: MaterialVarianteDto): Observable<MaterialVarianteDto> {
    return this.repository.guardarVariante(dto);
  }
}