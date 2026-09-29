export interface PanelDto {
  numero: number;
  xInicioCm: number;
  xFinCm: number;
  yInicioCm: number;
  yFinCm: number;
  anchoCm: number;
  altoCm: number;
  rotado: boolean;
  areaIndex: number;
}

export interface AreaPanelizadaDto {
  anchoCm: number;
  altoCm: number;
  cantidad: number;
  areaM2: number;
  metrosLineales: number;
  paneles: number;
  detallePaneles: PanelDto[];
}

export interface PanelizadoResultadoDto {
  areaTotalM2: number;
  metrosLineales: number;
  anchoUtilCm: number;
  cantidadPaneles: number;
  desperdicioCm: number;
  panelizado: boolean;
  paneles: PanelDto[];
  areas: AreaPanelizadaDto[];
}