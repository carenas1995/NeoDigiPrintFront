import { ProductoConfiguracionDto } from './producto.interface';

export interface MaterialDto {
  id: number;
  productoId: number;
  marcaId?: number;
  nombre: string;
  descripcion?: string;
  anchoUtilCm?: number;
  activo: boolean;
  configuracion?: ProductoConfiguracionDto; 
  variantes: MaterialVarianteDto[];
  archivos: MaterialArchivoDto[];
}

export interface MaterialVarianteDto {
  id: number;
  materialId: number;
  codigo?: string;
  nombre: string;
  fabricanteCodigo?: string;
  colorHex?: string;
  observaciones?: string;
  imagenPrincipal?: string;
  precioAdicional?: number;
  ordenVisualizacion?: number;
  activo: boolean;
}

export interface MaterialArchivoDto {
  id: number;
  materialId: number;
  varianteId?: number;
  tipoArchivo: string;
  nombre?: string;
  url: string;
  ordenVisualizacion: number;
  activo: boolean;
}

export interface MaterialResultadoDto {
  cantidadCobro: number;
  precioUnitario: number;
  costoMaterial: number;
  areaM2: number;
  metrosLineales: number;
}