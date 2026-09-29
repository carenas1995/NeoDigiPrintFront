export interface ProductoDto {
  id: number;
  servicioId: number;
  codigo: string;
  nombre: string;
  descripcion?: string;
  activo: boolean;
}

export interface PresentacionDto {
  id: number;
  productoMarcaId: number;
  nombre: string;
  anchoComercialCm?: number;
  anchoRealCm?: number;
  anchoUtilCm?: number;
  largoRolloM?: number;
  unidadMedidaId: number;
  permitePanelizado: boolean;
  panelizadoAutomatico: boolean;
  direccionPanelizado: string;
  traslapoMm: number;
  margenCorteMm: number;
  permiteRotacion: boolean;
  activo: boolean;
}

export interface ProductoEscalaDto {
  id: number;
  cantidadDesde: number;
  cantidadHasta: number;
  precio: number;
  costo: number;
}

export interface ProductoConfiguracionDto {
  id: number;
  productoId?: number;
  materialId?: number;
  productoPresentacionId?: number;
  tipoTintaId?: number;
  modoSinInstalarId?: number;
  modoInstaladoId?: number;
  tipoCalculo?: string; // 'AREA' | 'ESCALA' | 'UNIDAD'
  precioBase?: number;
  costoBase?: number;
  costo?: number;
  precioSinInstalar?: number;
  precioInstalado?: number;
  margenGananciaPorcentaje?: number;
  aplicaDesperdicio?: boolean;
  porcentajeDesperdicio?: number;
  permiteInstalacion?: boolean;
  permiteLaminado?: boolean;
  permiteTintaBlanca?: boolean;
  permiteCantidad?: boolean;
  cantidadMinima?: number;
  activo: boolean;
  escalas?: ProductoEscalaDto[];
}