import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogoRepository } from '../../repositorios/CatalogoRepository';
import { ProductoDto } from '../../interface/producto.interface';
import { UseCase } from '../../base/usecase';

@Injectable({ providedIn: 'root' })
export class GuardarProductoUseCase implements UseCase<ProductoDto, ProductoDto> {
  constructor(private repository: CatalogoRepository) {}

  execute(dto: ProductoDto): Observable<ProductoDto> {
    return this.repository.guardarProducto(dto);
  }
}