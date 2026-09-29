import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogoRepository } from '../../repositorios/CatalogoRepository';
import { MaterialDto } from '../../interface/material.interface';
import { UseCase } from '../../base/usecase';

@Injectable({ providedIn: 'root' })
export class GuardarMaterialUseCase implements UseCase<MaterialDto, MaterialDto> {
  constructor(private repository: CatalogoRepository) {}

  execute(dto: MaterialDto): Observable<MaterialDto> {
    return this.repository.guardarMaterial(dto);
  }
}