import { Observable } from 'rxjs';
import { ServicioDto } from '../interface/servicio-catalogos.interface';
import { ProductoDto, PresentacionDto } from '../interface/producto.interface';
import { MaterialDto, MaterialVarianteDto, MaterialArchivoDto } from '../interface/material.interface';
import { MarcaDto } from '../interface/marca.interface';

export abstract class CatalogoRepository {
  // Servicios
  abstract obtenerServicios(): Observable<ServicioDto[]>;
  abstract obtenerServicio(id: number): Observable<ServicioDto>;
  abstract guardarServicio(dto: ServicioDto): Observable<ServicioDto>;
  abstract desactivarServicio(id: number): Observable<boolean>;

  // Productos
  abstract obtenerProductos(servicioId: number): Observable<ProductoDto[]>;
  abstract obtenerProducto(id: number): Observable<ProductoDto>;
  abstract guardarProducto(dto: ProductoDto): Observable<ProductoDto>;
  abstract desactivarProducto(id: number): Observable<boolean>;

  // Marcas
  abstract obtenerMarcas(productoId: number): Observable<MarcaDto[]>;
  abstract guardarMarca(dto: MarcaDto): Observable<MarcaDto>;
  abstract desactivarMarca(id: number): Observable<boolean>;

  // Presentaciones
  abstract obtenerPresentaciones(productoMarcaId: number): Observable<PresentacionDto[]>;
  abstract obtenerPresentacion(id: number): Observable<PresentacionDto>;
  abstract guardarPresentacion(dto: PresentacionDto): Observable<PresentacionDto>;
  abstract desactivarPresentacion(id: number): Observable<boolean>;

  // Materiales
  abstract obtenerMateriales(productoId: number): Observable<MaterialDto[]>;
  abstract guardarMaterial(dto: MaterialDto): Observable<MaterialDto>;
  abstract desactivarMaterial(id: number): Observable<boolean>;

  // Variantes
  abstract obtenerVariantes(materialId: number): Observable<MaterialVarianteDto[]>;
  abstract obtenerVariante(id: number): Observable<MaterialVarianteDto>;
  abstract guardarVariante(dto: MaterialVarianteDto): Observable<MaterialVarianteDto>;
  abstract desactivarVariante(id: number): Observable<boolean>;

  // Archivos
  abstract obtenerArchivos(materialId: number): Observable<MaterialArchivoDto[]>;
  abstract guardarArchivo(dto: MaterialArchivoDto): Observable<MaterialArchivoDto>;
  abstract desactivarArchivo(id: number): Observable<boolean>;
}