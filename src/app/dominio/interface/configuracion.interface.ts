export interface ConfiguracionGeneralDto {
  id: number;
  clave: string;
  valor?: string;
  tipo: string;
  descripcion?: string;
  editable: boolean;
}

export interface ConfiguracionEmpresaDto {
  id: number;
  nombre: string;
  nit?: string;
  direccion?: string;
  ciudad?: string;
  departamento?: string;
  pais?: string;
  telefono?: string;
  whatsapp?: string;
  email?: string;
  sitioWeb?: string;
  logo?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  activo: boolean;
}