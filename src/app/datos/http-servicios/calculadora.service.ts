import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CalculadoraRepository } from '../../dominio/repositorios/CalculadoraRepository';
import { 
  CalcularCotizacionDto, 
  CotizacionResultadoCalculoDto, 
  CotizacionGuardadaDto, 
  CotizacionDto, 
  CotizacionResumenDto 
} from '../../dominio/interface/cotizacion.interface';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService implements CalculadoraRepository {
  private readonly apiUrlCalculadora = `${environment.urlWebApi}/Calculadora`;
  private readonly apiUrlCotizaciones = `${environment.urlWebApi}/Cotizaciones`;

  constructor(private http: HttpClient) {}

  calcular(dto: CalcularCotizacionDto): Observable<CotizacionResultadoCalculoDto> {
    return this.http.post<CotizacionResultadoCalculoDto>(`${this.apiUrlCalculadora}/calcular`, dto);
  }

  obtenerAdicionales(servicioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlCalculadora}/adicionales/${servicioId}`);
  }

  crear(input: CalcularCotizacionDto): Observable<CotizacionGuardadaDto> {
    return this.http.post<CotizacionGuardadaDto>(this.apiUrlCotizaciones, input);
  }

  obtener(id: number): Observable<CotizacionDto> {
    return this.http.get<CotizacionDto>(`${this.apiUrlCotizaciones}/${id}`);
  }

  listar(): Observable<CotizacionResumenDto[]> {
    return this.http.get<CotizacionResumenDto[]>(this.apiUrlCotizaciones);
  }

  actualizarEstado(id: number, nuevoEstado: string): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrlCotizaciones}/${id}/estado`, JSON.stringify(nuevoEstado), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  asignarCostoDomicilio(id: number, costoDomicilio: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrlCotizaciones}/${id}/domicilio`, costoDomicilio, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}