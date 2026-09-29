export interface ServicioDto {
  id: number;
  nombre: string;
  codigo: string;
  descripcion?: string;
  motorCalculoId: number;
  motorCalculo?: string;
  activo: boolean;
}

export interface MotorCalculoDto {
  id: number;
  nombre: string;
  descripcion?: string;
  activo: boolean;
}

export interface ModoCalculoDto {
  id: number;
  nombre: string;
  descripcion?: string;
  activo: boolean;
}

export interface PromocionDetalleDto {
  id: number;
  nombre: string;
  valor: number;
}

export interface PromocionResultadoDto {
  total: number;
  detalles: PromocionDetalleDto[];
}