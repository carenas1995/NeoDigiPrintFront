import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogoRepository } from '../../repositorios/CatalogoRepository';
import { ProductoDto } from '../../interface/producto.interface';
import { UseCase } from '../../base/usecase';

@Injectable({ providedIn: 'root' })
export class ObtenerProductosUseCase implements UseCase<number, ProductoDto[]> {
  constructor(private repository: CatalogoRepository) {}

  execute(servicioId: number): Observable<ProductoDto[]> {
    return this.repository.obtenerProductos(servicioId);
  }
}