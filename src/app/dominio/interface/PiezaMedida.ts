export interface PiezaMedida {
  ancho: number;
  alto: number;
  cantidad: number;
}

export interface PiezaOptimizada {
  anchoOriginal: number;
  altoOriginal: number;
  anchoAjustado: number;
  altoAjustado: number;
  rotada: boolean;
  cantidad: number;
}

export interface PiezaCanvasBox {
  ancho: number;
  alto: number;
  originalIndex: number;
  x: number;
  y: number;
  rotada: boolean;
}

export interface PiezaCanvas {
  w: number;
  h: number;
  x: number;
  y: number;
  maxY: number
}