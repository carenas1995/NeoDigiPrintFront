import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogoRepository } from '../../repositorios/CatalogoRepository';
import { PresentacionDto } from '../../interface/producto.interface';
import { UseCase } from '../../base/usecase';

@Injectable({ providedIn: 'root' })
export class ObtenerPresentacionesUseCase implements UseCase<number, PresentacionDto[]> {
  constructor(private repository: CatalogoRepository) {}

  execute(productoMarcaId: number): Observable<PresentacionDto[]> {
    return this.repository.obtenerPresentaciones(productoMarcaId);
  }
}