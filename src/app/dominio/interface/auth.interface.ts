export interface  UsuarioDto {
  id: number;
  usuario: string;
  nombre: string;
  apellidos?: string;
  correo: string;
  telefono?: string;
  cargo?: string;
  activo: boolean;
  roles: string[];
}

export interface LoginInputDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
  expira: string;
  usuario: UsuarioDto;
  roles: string[];
  permisos: string[];
}