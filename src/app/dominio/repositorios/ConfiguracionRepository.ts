import { Observable } from 'rxjs';
import { ConfiguracionGeneralDto, ConfiguracionEmpresaDto } from '../interface/configuracion.interface';
import { ProductoConfiguracionDto } from '../interface/producto.interface';
import { MotorCalculoDto, ModoCalculoDto } from '../interface/servicio-catalogos.interface';


export abstract class AdminConfigRepository {
  abstract obtenerGenerales(): Observable<ConfiguracionGeneralDto[]>;
  abstract obtenerGeneralPorId(id: number): Observable<ConfiguracionGeneralDto>;
  abstract guardarGeneral(dto: ConfiguracionGeneralDto): Observable<ConfiguracionGeneralDto>;
  abstract obtenerEmpresa(): Observable<ConfiguracionEmpresaDto>;
  abstract guardarEmpresa(dto: ConfiguracionEmpresaDto): Observable<ConfiguracionEmpresaDto>;
  abstract obtenerMotores(): Observable<MotorCalculoDto[]>;
  abstract guardarMotor(dto: MotorCalculoDto): Observable<MotorCalculoDto>;
  abstract desactivarMotor(id: number): Observable<boolean>;
  abstract obtenerModos(): Observable<ModoCalculoDto[]>;
  abstract guardarModo(dto: ModoCalculoDto): Observable<ModoCalculoDto>;
  abstract desactivarModo(id: number): Observable<boolean>;
  abstract obtenerConfiguracionesProducto(presentacionId: number): Observable<ProductoConfiguracionDto[]>;
  abstract guardarConfiguracionProducto(dto: ProductoConfiguracionDto): Observable<ProductoConfiguracionDto>;
  abstract desactivarConfiguracionProducto(id: number): Observable<boolean>;
}