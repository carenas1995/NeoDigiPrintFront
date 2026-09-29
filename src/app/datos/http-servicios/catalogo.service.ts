import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CatalogoRepository } from '../../dominio/repositorios/CatalogoRepository';
import { ServicioDto } from '../../dominio/interface/servicio-catalogos.interface';
import { ProductoDto, PresentacionDto } from '../../dominio/interface/producto.interface';
import { MaterialDto, MaterialVarianteDto, MaterialArchivoDto } from '../../dominio/interface/material.interface';
import { MarcaDto } from '../../dominio/interface/marca.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService implements CatalogoRepository {
  private readonly apiUrl = `${environment.urlWebApi}/Catalogo`; // Ruta C#

  constructor(private http: HttpClient) {}

  // Servicios
  obtenerServicios(): Observable<ServicioDto[]> {
    return this.http.get<ServicioDto[]>(`${this.apiUrl}/servicios`);
  }
  obtenerServicio(id: number): Observable<ServicioDto> {
    return this.http.get<ServicioDto>(`${this.apiUrl}/servicios/${id}`);
  }
  guardarServicio(dto: ServicioDto): Observable<ServicioDto> {
    return this.http.post<ServicioDto>(`${this.apiUrl}/servicios`, dto);
  }
  desactivarServicio(id: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/servicios/${id}/desactivar`, {});
  }

  // Productos
  obtenerProductos(servicioId: number): Observable<ProductoDto[]> {
    return this.http.get<ProductoDto[]>(`${this.apiUrl}/productos/servicio/${servicioId}`);
  }
  obtenerProducto(id: number): Observable<ProductoDto> {
    return this.http.get<ProductoDto>(`${this.apiUrl}/productos/${id}`);
  }
  guardarProducto(dto: ProductoDto): Observable<ProductoDto> {
    return this.http.post<ProductoDto>(`${this.apiUrl}/productos`, dto);
  }
  desactivarProducto(id: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/productos/${id}/desactivar`, {});
  }

  // Marcas
  obtenerMarcas(productoId: number): Observable<MarcaDto[]> {
    return this.http.get<MarcaDto[]>(`${this.apiUrl}/marcas/producto/${productoId}`);
  }
  guardarMarca(dto: MarcaDto): Observable<MarcaDto> {
    return this.http.post<MarcaDto>(`${this.apiUrl}/marcas`, dto);
  }
  desactivarMarca(id: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/marcas/${id}/desactivar`, {});
  }

  // Presentaciones
  obtenerPresentaciones(productoMarcaId: number): Observable<PresentacionDto[]> {
    return this.http.get<PresentacionDto[]>(`${this.apiUrl}/presentaciones/producto-marca/${productoMarcaId}`);
  }
  obtenerPresentacion(id: number): Observable<PresentacionDto> {
    return this.http.get<PresentacionDto>(`${this.apiUrl}/presentaciones/${id}`);
  }
  guardarPresentacion(dto: PresentacionDto): Observable<PresentacionDto> {
    return this.http.post<PresentacionDto>(`${this.apiUrl}/presentaciones`, dto);
  }
  desactivarPresentacion(id: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/presentaciones/${id}/desactivar`, {});
  }

  // Materiales
  obtenerMateriales(productoId: number): Observable<MaterialDto[]> {
    return this.http.get<MaterialDto[]>(`${this.apiUrl}/materiales/producto/${productoId}`);
  }
  guardarMaterial(dto: MaterialDto): Observable<MaterialDto> {
    return this.http.post<MaterialDto>(`${this.apiUrl}/materiales`, dto);
  }
  desactivarMaterial(id: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/materiales/${id}/desactivar`, {});
  }

  // Variantes
  obtenerVariantes(materialId: number): Observable<MaterialVarianteDto[]> {
    return this.http.get<MaterialVarianteDto[]>(`${this.apiUrl}/variantes/material/${materialId}`);
  }
  obtenerVariante(id: number): Observable<MaterialVarianteDto> {
    return this.http.get<MaterialVarianteDto>(`${this.apiUrl}/variantes/${id}`);
  }
  guardarVariante(dto: MaterialVarianteDto): Observable<MaterialVarianteDto> {
    return this.http.post<MaterialVarianteDto>(`${this.apiUrl}/variantes`, dto);
  }
  desactivarVariante(id: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/variantes/${id}/desactivar`, {});
  }

  // Archivos
  obtenerArchivos(materialId: number): Observable<MaterialArchivoDto[]> {
    return this.http.get<MaterialArchivoDto[]>(`${this.apiUrl}/archivos/material/${materialId}`);
  }
  guardarArchivo(dto: MaterialArchivoDto): Observable<MaterialArchivoDto> {
    return this.http.post<MaterialArchivoDto>(`${this.apiUrl}/archivos`, dto);
  }
  desactivarArchivo(id: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/archivos/${id}/desactivar`, {});
  }
}