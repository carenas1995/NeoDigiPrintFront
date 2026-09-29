import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogoRepository } from '../../repositorios/CatalogoRepository';
import { MaterialDto } from '../../interface/material.interface';
import { UseCase } from '../../base/usecase';

@Injectable({ providedIn: 'root' })
export class ObtenerMaterialesUseCase implements UseCase<number, MaterialDto[]> {
  constructor(private repository: CatalogoRepository) {}

  execute(productoId: number): Observable<MaterialDto[]> {
    return this.repository.obtenerMateriales(productoId);
  }
}