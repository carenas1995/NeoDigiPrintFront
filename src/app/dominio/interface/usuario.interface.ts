export interface CrearUsuarioDto {
  username: string;
  password: string;
  correo: string;
  activo: boolean;
  nombres: string;
  apellidos?: string;
  telefono?: string;
  direccion?: string;
  cargo?: string;
  observaciones?: string;
  roles: number[];
}

export interface ActualizarUsuarioDto {
  correo: string;
  activo: boolean;
  nombres: string;
  apellidos?: string;
  telefono?: string;
  direccion?: string;
  cargo?: string;
  observaciones?: string;
  roles: number[];
}

export interface CambiarPasswordDto {
  passwordActual: string;
  passwordNueva: string;
}