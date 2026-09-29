import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogoRepository } from '../../repositorios/CatalogoRepository';
import { UseCase } from '../../base/usecase';

@Injectable({ providedIn: 'root' })
export class DesactivarProductoUseCase implements UseCase<number, boolean> {
  constructor(private repository: CatalogoRepository) {}

  execute(id: number): Observable<boolean> {
    return this.repository.desactivarProducto(id);
  }
}