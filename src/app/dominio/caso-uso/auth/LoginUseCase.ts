import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository } from '../../repositorios/AuthRepository';
import { UseCase } from '../../base/usecase';
import { LoginInputDto, LoginResponseDto } from '../../interface/auth.interface';

@Injectable({ providedIn: 'root' })
export class LoginUseCase implements UseCase<LoginInputDto, LoginResponseDto> {
  constructor(private repository: AuthRepository) {}

  execute(dto: LoginInputDto): Observable<LoginResponseDto> {
    return this.repository.login(dto);
  }
}