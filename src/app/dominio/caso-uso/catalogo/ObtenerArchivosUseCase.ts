import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogoRepository } from '../../repositorios/CatalogoRepository';
import { MaterialArchivoDto } from '../../interface/material.interface';
import { UseCase } from '../../base/usecase';

@Injectable({ providedIn: 'root' })
export class ObtenerArchivosUseCase implements UseCase<number, MaterialArchivoDto[]> {
  constructor(private repository: CatalogoRepository) {}

  execute(materialId: number): Observable<MaterialArchivoDto[]> {
    return this.repository.obtenerArchivos(materialId);
  }
}