import { Observable } from 'rxjs';
import { LoginInputDto, LoginResponseDto } from '../interface/auth.interface';

export abstract class AuthRepository {
  abstract login(dto: LoginInputDto): Observable<LoginResponseDto>;
}