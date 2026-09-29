import { Observable } from 'rxjs';
import { 
  CalcularCotizacionDto, 
  CotizacionResultadoCalculoDto, 
  CotizacionGuardadaDto, 
  CotizacionDto, 
  CotizacionResumenDto 
} from '../interface/cotizacion.interface';

export abstract class CalculadoraRepository {
  abstract calcular(dto: CalcularCotizacionDto): Observable<CotizacionResultadoCalculoDto>;
  abstract obtenerAdicionales(servicioId: number): Observable<any[]>;
  abstract crear(input: CalcularCotizacionDto): Observable<CotizacionGuardadaDto>;
  abstract obtener(id: number): Observable<CotizacionDto>;
  abstract listar(): Observable<CotizacionResumenDto[]>;
  abstract actualizarEstado(id: number, nuevoEstado: string): Observable<boolean>;
  abstract asignarCostoDomicilio(id: number, costoDomicilio: number): Observable<boolean>;
}