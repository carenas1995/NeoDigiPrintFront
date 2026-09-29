export type NivelCatalogo = 'SERVICIOS' | 'PRODUCTOS' | 'DETALLE_PRODUCTO';

export interface BreadcrumbItem {
  label: string;
  nivel: NivelCatalogo;
  id?: number;
}