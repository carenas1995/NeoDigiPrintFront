export interface AdicionalDto {
  id: number;
  servicioId: number;
  nombre: string;
  descripcion?: string;
  tipoCobro: string; // Fijo, PorM2, etc.
  valor: number;
  activo: boolean;
}

export interface AdicionalDetalleDto {
  id: number;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  total: number;
}

export interface AdicionalResultadoDto {
  total: number;
  detalles: AdicionalDetalleDto[];
}