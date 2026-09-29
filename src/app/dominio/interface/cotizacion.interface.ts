export interface CotizacionItemInputDto {
  productoConfiguracionId: number;
  cantidad: number;
  anchoCm: number;
  largoCm: number;
  requiereInstalacion: boolean;
  tipoLaminadoId?: number | null;
  materialVarianteId?: number | null;
  tipoAcabadoId?: number | null;
  adicionalIds?: number[];
}

export interface CalcularCotizacionDto {
  clienteNombre: string;
  clienteEmail: string;
  clienteTelefono: string;
  items: CotizacionItemInputDto[];
}

export interface CotizacionAdicionalDetalleDto {
  adicionalId: number;
  adicionalNombre: string;
  tipoCobro: string;
  valor: number;
}

export interface CotizacionDetalleDto {
  id: number;
  cotizacionId: number;
  configuracionId: number;
  servicioId: number;
  servicioNombre: string;
  productoNombre: string;
  materialNombre: string;
  cantidad: number;
  anchoCm: number;
  largoCm: number;
  areaTotalM2: number;
  precioUnitario: number;
  subtotal: number;
  instalado: boolean;
  adicionales: CotizacionAdicionalDetalleDto[];
}

export interface CotizacionResultadoCalculoDto {
  subtotal: number;
  descuento: number;
  impuesto: number;
  total: number;
  detalles: CotizacionDetalleDto[];
}

export interface CotizacionDto {
  id: number;
  numero: string;
  servicioId: number;
  servicio: string;
  fecha: string;
  cliente: string;
  telefono: string;
  correo?: string;
  estado: string;
  subtotal: number;
  descuento: number;
  iva: number;
  costoDomicilio: number;
  total: number;
  observaciones?: string;
  urlWhatsApp?: string;
  mensajeWhatsApp?: string;
  detalles: CotizacionDetalleDto[];
}

export interface CotizacionResumenDto {
  id: number;
  numero: string;
  fecha: string;
  cliente?: string;
  telefono?: string;
  servicio: string;
  total: number;
  estado: string;
}

export interface CotizacionResponseDto {
  id: number;
  numero: string;
  clienteNombre: string;
  clienteEmail: string;
  clienteTelefono: string;
  subtotal: number;
  descuento: number;
  iva: number;
  total: number;
  estado: string;
  pdfUrl?: string;
  urlWhatsApp?: string;
  creadoEn: string;
}

export interface CotizacionGuardadaDto {
  cotizacionId: number;
  codigo: string;
  total: number;
  mensajeWhatsApp: string;
  urlWhatsApp: string;
}