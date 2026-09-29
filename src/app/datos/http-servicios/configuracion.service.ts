import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfiguracionGeneralDto, ConfiguracionEmpresaDto } from '../../dominio/interface/configuracion.interface';
import { ProductoConfiguracionDto } from '../../dominio/interface/producto.interface';
import { MotorCalculoDto, ModoCalculoDto } from '../../dominio/interface/servicio-catalogos.interface';
import { AdminConfigRepository } from '../../dominio/repositorios/ConfiguracionRepository';


@Injectable({
  providedIn: 'root'
})
export class AdminConfigService implements AdminConfigRepository {
  private readonly apiUrl = `${environment.urlWebApi}/AdminConfig`; // Ruta C#

  constructor(private http: HttpClient) {}

  obtenerGenerales(): Observable<ConfiguracionGeneralDto[]> {
    return this.http.get<ConfiguracionGeneralDto[]>(`${this.apiUrl}/generales`);
  }

  obtenerGeneralPorId(id: number): Observable<ConfiguracionGeneralDto> {
    return this.http.get<ConfiguracionGeneralDto>(`${this.apiUrl}/generales/${id}`);
  }

  guardarGeneral(dto: ConfiguracionGeneralDto): Observable<ConfiguracionGeneralDto> {
    return this.http.post<ConfiguracionGeneralDto>(`${this.apiUrl}/generales`, dto);
  }

  obtenerEmpresa(): Observable<ConfiguracionEmpresaDto> {
    return this.http.get<ConfiguracionEmpresaDto>(`${this.apiUrl}/empresa`);
  }

  guardarEmpresa(dto: ConfiguracionEmpresaDto): Observable<ConfiguracionEmpresaDto> {
    return this.http.post<ConfiguracionEmpresaDto>(`${this.apiUrl}/empresa`, dto);
  }

  obtenerMotores(): Observable<MotorCalculoDto[]> {
    return this.http.get<MotorCalculoDto[]>(`${this.apiUrl}/motores`);
  }

  guardarMotor(dto: MotorCalculoDto): Observable<MotorCalculoDto> {
    return this.http.post<MotorCalculoDto>(`${this.apiUrl}/motores`, dto);
  }

  desactivarMotor(id: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/motores/${id}/desactivar`, {});
  }

  obtenerModos(): Observable<ModoCalculoDto[]> {
    return this.http.get<ModoCalculoDto[]>(`${this.apiUrl}/modos`);
  }

  guardarModo(dto: ModoCalculoDto): Observable<ModoCalculoDto> {
    return this.http.post<ModoCalculoDto>(`${this.apiUrl}/modos`, dto);
  }

  desactivarModo(id: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/modos/${id}/desactivar`, {});
  }

  obtenerConfiguracionesProducto(presentacionId: number): Observable<ProductoConfiguracionDto[]> {
    return this.http.get<ProductoConfiguracionDto[]>(`${this.apiUrl}/producto/presentacion/${presentacionId}`);
  }

  guardarConfiguracionProducto(dto: ProductoConfiguracionDto): Observable<ProductoConfiguracionDto> {
    return this.http.post<ProductoConfiguracionDto>(`${this.apiUrl}/producto`, dto);
  }

  desactivarConfiguracionProducto(id: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/producto/${id}/desactivar`, {});
  }
}