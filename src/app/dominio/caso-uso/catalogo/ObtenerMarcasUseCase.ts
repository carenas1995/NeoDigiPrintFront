import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogoRepository } from '../../repositorios/CatalogoRepository';
import { UseCase } from '../../base/usecase';
import { MarcaDto } from '../../interface/marca.interface';

@Injectable({ providedIn: 'root' })
export class ObtenerMarcasUseCase implements UseCase<number, MarcaDto[]> {
  constructor(private repository: CatalogoRepository) {}

  execute(productoId: number): Observable<MarcaDto[]> {
    return this.repository.obtenerMarcas(productoId);
  }
}