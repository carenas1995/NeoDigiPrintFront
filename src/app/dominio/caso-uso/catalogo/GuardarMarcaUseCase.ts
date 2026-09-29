import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogoRepository } from '../../repositorios/CatalogoRepository';
import { MarcaDto } from '../../interface/marca.interface';
import { UseCase } from '../../base/usecase';

@Injectable({ providedIn: 'root' })
export class GuardarMarcaUseCase implements UseCase<MarcaDto, MarcaDto> {
  constructor(private repository: CatalogoRepository) {}

  execute(dto: MarcaDto): Observable<MarcaDto> {
    return this.repository.guardarMarca(dto);
  }
}