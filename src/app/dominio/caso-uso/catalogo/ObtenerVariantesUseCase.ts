import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogoRepository } from '../../repositorios/CatalogoRepository';
import { MaterialVarianteDto } from '../../interface/material.interface';
import { UseCase } from '../../base/usecase';

@Injectable({ providedIn: 'root' })
export class ObtenerVariantesUseCase implements UseCase<number, MaterialVarianteDto[]> {
  constructor(private repository: CatalogoRepository) {}

  execute(materialId: number): Observable<MaterialVarianteDto[]> {
    return this.repository.obtenerVariantes(materialId);
  }
}