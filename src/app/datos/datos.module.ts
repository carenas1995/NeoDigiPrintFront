import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

//#region Repositorios (Dominio)
import { AuthRepository } from '../dominio/repositorios/AuthRepository';
import { CalculadoraRepository } from '../dominio/repositorios/CalculadoraRepository';
import { CatalogoRepository } from '../dominio/repositorios/CatalogoRepository';
import { AdminConfigRepository } from '../dominio/repositorios/ConfiguracionRepository';
import { UsuarioRepository } from '../dominio/repositorios/UsuarioRepository';
//#endregion

//#region Servicios (Infraestructura)
import { AuthService } from './http-servicios/auth.service';
import { CalculadoraService } from './http-servicios/calculadora.service';
import { CatalogoService } from './http-servicios/catalogo.service';
import { AdminConfigService } from './http-servicios/configuracion.service';
import { UsuarioService } from './http-servicios/usuario.service';
//#endregion

//#region Casos de Uso - Auth
import { LoginUseCase } from '../dominio/caso-uso/auth/LoginUseCase';
//#endregion

//#region Casos de Uso - Calculadora
import { CalcularCotizacionUseCase } from '../dominio/caso-uso/calculadora/CalcularCotizacionUseCase';
import { CrearCotizacionUseCase } from '../dominio/caso-uso/calculadora/CrearCotizacionUseCase';
import { ObtenerCotizacionUseCase } from '../dominio/caso-uso/calculadora/ObtenerCotizacionUseCase';
import { ListarCotizacionesUseCase } from '../dominio/caso-uso/calculadora/ListarCotizacionesUseCase';
import { ActualizarEstadoCotizacionUseCase } from '../dominio/caso-uso/calculadora/ActualizarEstadoCotizacionUseCase';
import { AsignarCostoDomicilioUseCase } from '../dominio/caso-uso/calculadora/AsignarCostoDomicilioUseCase';
import { ObtenerAdicionalesUseCase } from '../dominio/caso-uso/calculadora/ObtenerAdicionalesUseCase';
//#endregion

//#region Casos de Uso - Catálogo
import { ObtenerServiciosUseCase } from '../dominio/caso-uso/catalogo/ObtenerServiciosUseCase';
import { GuardarServicioUseCase } from '../dominio/caso-uso/catalogo/GuardarServicioUseCase';
import { DesactivarServicioUseCase } from '../dominio/caso-uso/catalogo/DesactivarServicioUseCase';
import { ObtenerProductosUseCase } from '../dominio/caso-uso/catalogo/ObtenerProductosUseCase';
import { GuardarProductoUseCase } from '../dominio/caso-uso/catalogo/GuardarProductoUseCase';
import { DesactivarProductoUseCase } from '../dominio/caso-uso/catalogo/DesactivarProductoUseCase';
import { ObtenerMarcasUseCase } from '../dominio/caso-uso/catalogo/ObtenerMarcasUseCase';
import { GuardarMarcaUseCase } from '../dominio/caso-uso/catalogo/GuardarMarcaUseCase';
import { DesactivarMarcaUseCase } from '../dominio/caso-uso/catalogo/DesactivarMarcaUseCase';
import { ObtenerPresentacionesUseCase } from '../dominio/caso-uso/catalogo/ObtenerPresentacionesUseCase';
import { GuardarPresentacionUseCase } from '../dominio/caso-uso/catalogo/GuardarPresentacionUseCase';
import { DesactivarPresentacionUseCase } from '../dominio/caso-uso/catalogo/DesactivarPresentacionUseCase';
import { ObtenerMaterialesUseCase } from '../dominio/caso-uso/catalogo/ObtenerMaterialesUseCase';
import { GuardarMaterialUseCase } from '../dominio/caso-uso/catalogo/GuardarMaterialUseCase';
import { ObtenerVariantesUseCase } from '../dominio/caso-uso/catalogo/ObtenerVariantesUseCase';
import { GuardarVarianteUseCase } from '../dominio/caso-uso/catalogo/GuardarVarianteUseCase';
import { ObtenerArchivosUseCase } from '../dominio/caso-uso/catalogo/ObtenerArchivosUseCase';
//#endregion

//#region Casos de Uso - AdminConfig
import { ObtenerGeneralesUseCase } from '../dominio/caso-uso/config/ObtenerGeneralesUseCase';
import { GuardarGeneralUseCase } from '../dominio/caso-uso/config/GuardarGeneralUseCase';
import { ObtenerEmpresaUseCase } from '../dominio/caso-uso/config/ObtenerEmpresaUseCase';
import { GuardarEmpresaUseCase } from '../dominio/caso-uso/config/GuardarEmpresaUseCase';
import { ObtenerMotoresUseCase } from '../dominio/caso-uso/config/ObtenerMotoresUseCase';
import { GuardarMotorUseCase } from '../dominio/caso-uso/config/GuardarMotorUseCase';
import { DesactivarMotorUseCase } from '../dominio/caso-uso/config/DesactivarMotorUseCase';
import { ObtenerModosUseCase } from '../dominio/caso-uso/config/ObtenerModosUseCase';
import { GuardarModoUseCase } from '../dominio/caso-uso/config/GuardarModoUseCase';
import { DesactivarModoUseCase } from '../dominio/caso-uso/config/DesactivarModoUseCase';
//#endregion

//#region Casos de Uso - Usuarios
import { ObtenerUsuariosUseCase } from '../dominio/caso-uso/usuario/ObtenerUsuariosUseCase';
import { CrearUsuarioUseCase } from '../dominio/caso-uso/usuario/CrearUsuarioUseCase';
import { ActualizarUsuarioUseCase } from '../dominio/caso-uso/usuario/ActualizarUsuarioUseCase';
import { CambiarEstadoUsuarioUseCase } from '../dominio/caso-uso/usuario/CambiarEstadoUsuarioUseCase';
import { CambiarPasswordUsuarioUseCase } from '../dominio/caso-uso/usuario/CambiarPasswordUsuarioUseCase';
import { AsignarRolesUsuarioUseCase } from '../dominio/caso-uso/usuario/AsignarRolesUsuarioUseCase';
//#endregion

//#region Providers / Factorías

// Auth
export const loginUseCaseProvider = {
  provide: LoginUseCase,
  useFactory: (repo: AuthRepository) => new LoginUseCase(repo),
  deps: [AuthRepository]
};

// Calculadora
export const calcularCotizacionUseCaseProvider = { provide: CalcularCotizacionUseCase, useFactory: (repo: CalculadoraRepository) => new CalcularCotizacionUseCase(repo), deps: [CalculadoraRepository] };
export const crearCotizacionUseCaseProvider = { provide: CrearCotizacionUseCase, useFactory: (repo: CalculadoraRepository) => new CrearCotizacionUseCase(repo), deps: [CalculadoraRepository] };
export const obtenerCotizacionUseCaseProvider = { provide: ObtenerCotizacionUseCase, useFactory: (repo: CalculadoraRepository) => new ObtenerCotizacionUseCase(repo), deps: [CalculadoraRepository] };
export const listarCotizacionesUseCaseProvider = { provide: ListarCotizacionesUseCase, useFactory: (repo: CalculadoraRepository) => new ListarCotizacionesUseCase(repo), deps: [CalculadoraRepository] };
export const actualizarEstadoCotizacionUseCaseProvider = { provide: ActualizarEstadoCotizacionUseCase, useFactory: (repo: CalculadoraRepository) => new ActualizarEstadoCotizacionUseCase(repo), deps: [CalculadoraRepository] };
export const asignarCostoDomicilioUseCaseProvider = { provide: AsignarCostoDomicilioUseCase, useFactory: (repo: CalculadoraRepository) => new AsignarCostoDomicilioUseCase(repo), deps: [CalculadoraRepository] };
export const obtenerAdicionalesUseCaseProvider = { provide: ObtenerAdicionalesUseCase, useFactory: (repo: CalculadoraRepository) => new ObtenerAdicionalesUseCase(repo), deps: [CalculadoraRepository] };

// Catálogo
export const obtenerServiciosUseCaseProvider = { provide: ObtenerServiciosUseCase, useFactory: (repo: CatalogoRepository) => new ObtenerServiciosUseCase(repo), deps: [CatalogoRepository] };
export const guardarServicioUseCaseProvider = { provide: GuardarServicioUseCase, useFactory: (repo: CatalogoRepository) => new GuardarServicioUseCase(repo), deps: [CatalogoRepository] };
export const desactivarServicioUseCaseProvider = { provide: DesactivarServicioUseCase, useFactory: (repo: CatalogoRepository) => new DesactivarServicioUseCase(repo), deps: [CatalogoRepository] };
export const obtenerProductosUseCaseProvider = { provide: ObtenerProductosUseCase, useFactory: (repo: CatalogoRepository) => new ObtenerProductosUseCase(repo), deps: [CatalogoRepository] };
export const guardarProductoUseCaseProvider = { provide: GuardarProductoUseCase, useFactory: (repo: CatalogoRepository) => new GuardarProductoUseCase(repo), deps: [CatalogoRepository] };
export const desactivarProductoUseCaseProvider = { provide: DesactivarProductoUseCase, useFactory: (repo: CatalogoRepository) => new DesactivarProductoUseCase(repo), deps: [CatalogoRepository] };
export const obtenerMarcasUseCaseProvider = { provide: ObtenerMarcasUseCase, useFactory: (repo: CatalogoRepository) => new ObtenerMarcasUseCase(repo), deps: [CatalogoRepository] };
export const guardarMarcaUseCaseProvider = { provide: GuardarMarcaUseCase, useFactory: (repo: CatalogoRepository) => new GuardarMarcaUseCase(repo), deps: [CatalogoRepository] };
export const desactivarMarcaUseCaseProvider = { provide: DesactivarMarcaUseCase, useFactory: (repo: CatalogoRepository) => new DesactivarMarcaUseCase(repo), deps: [CatalogoRepository] };
export const obtenerPresentacionesUseCaseProvider = { provide: ObtenerPresentacionesUseCase, useFactory: (repo: CatalogoRepository) => new ObtenerPresentacionesUseCase(repo), deps: [CatalogoRepository] };
export const guardarPresentacionUseCaseProvider = { provide: GuardarPresentacionUseCase, useFactory: (repo: CatalogoRepository) => new GuardarPresentacionUseCase(repo), deps: [CatalogoRepository] };
export const desactivarPresentacionUseCaseProvider = { provide: DesactivarPresentacionUseCase, useFactory: (repo: CatalogoRepository) => new DesactivarPresentacionUseCase(repo), deps: [CatalogoRepository] };
export const obtenerMaterialesUseCaseProvider = { provide: ObtenerMaterialesUseCase, useFactory: (repo: CatalogoRepository) => new ObtenerMaterialesUseCase(repo), deps: [CatalogoRepository] };
export const guardarMaterialUseCaseProvider = { provide: GuardarMaterialUseCase, useFactory: (repo: CatalogoRepository) => new GuardarMaterialUseCase(repo), deps: [CatalogoRepository] };
export const obtenerVariantesUseCaseProvider = { provide: ObtenerVariantesUseCase, useFactory: (repo: CatalogoRepository) => new ObtenerVariantesUseCase(repo), deps: [CatalogoRepository] };
export const guardarVarianteUseCaseProvider = { provide: GuardarVarianteUseCase, useFactory: (repo: CatalogoRepository) => new GuardarVarianteUseCase(repo), deps: [CatalogoRepository] };
export const obtenerArchivosUseCaseProvider = { provide: ObtenerArchivosUseCase, useFactory: (repo: CatalogoRepository) => new ObtenerArchivosUseCase(repo), deps: [CatalogoRepository] };

// AdminConfig
export const obtenerGeneralesUseCaseProvider = { provide: ObtenerGeneralesUseCase, useFactory: (repo: AdminConfigRepository) => new ObtenerGeneralesUseCase(repo), deps: [AdminConfigRepository] };
export const guardarGeneralUseCaseProvider = { provide: GuardarGeneralUseCase, useFactory: (repo: AdminConfigRepository) => new GuardarGeneralUseCase(repo), deps: [AdminConfigRepository] };
export const obtenerEmpresaUseCaseProvider = { provide: ObtenerEmpresaUseCase, useFactory: (repo: AdminConfigRepository) => new ObtenerEmpresaUseCase(repo), deps: [AdminConfigRepository] };
export const guardarEmpresaUseCaseProvider = { provide: GuardarEmpresaUseCase, useFactory: (repo: AdminConfigRepository) => new GuardarEmpresaUseCase(repo), deps: [AdminConfigRepository] };
export const obtenerMotoresUseCaseProvider = { provide: ObtenerMotoresUseCase, useFactory: (repo: AdminConfigRepository) => new ObtenerMotoresUseCase(repo), deps: [AdminConfigRepository] };
export const guardarMotorUseCaseProvider = { provide: GuardarMotorUseCase, useFactory: (repo: AdminConfigRepository) => new GuardarMotorUseCase(repo), deps: [AdminConfigRepository] };
export const desactivarMotorUseCaseProvider = { provide: DesactivarMotorUseCase, useFactory: (repo: AdminConfigRepository) => new DesactivarMotorUseCase(repo), deps: [AdminConfigRepository] };
export const obtenerModosUseCaseProvider = { provide: ObtenerModosUseCase, useFactory: (repo: AdminConfigRepository) => new ObtenerModosUseCase(repo), deps: [AdminConfigRepository] };
export const guardarModoUseCaseProvider = { provide: GuardarModoUseCase, useFactory: (repo: AdminConfigRepository) => new GuardarModoUseCase(repo), deps: [AdminConfigRepository] };
export const desactivarModoUseCaseProvider = { provide: DesactivarModoUseCase, useFactory: (repo: AdminConfigRepository) => new DesactivarModoUseCase(repo), deps: [AdminConfigRepository] };

// Usuarios
export const obtenerUsuariosUseCaseProvider = { provide: ObtenerUsuariosUseCase, useFactory: (repo: UsuarioRepository) => new ObtenerUsuariosUseCase(repo), deps: [UsuarioRepository] };
export const crearUsuarioUseCaseProvider = { provide: CrearUsuarioUseCase, useFactory: (repo: UsuarioRepository) => new CrearUsuarioUseCase(repo), deps: [UsuarioRepository] };
export const actualizarUsuarioUseCaseProvider = { provide: ActualizarUsuarioUseCase, useFactory: (repo: UsuarioRepository) => new ActualizarUsuarioUseCase(repo), deps: [UsuarioRepository] };
export const cambiarEstadoUsuarioUseCaseProvider = { provide: CambiarEstadoUsuarioUseCase, useFactory: (repo: UsuarioRepository) => new CambiarEstadoUsuarioUseCase(repo), deps: [UsuarioRepository] };
export const cambiarPasswordUsuarioUseCaseProvider = { provide: CambiarPasswordUsuarioUseCase, useFactory: (repo: UsuarioRepository) => new CambiarPasswordUsuarioUseCase(repo), deps: [UsuarioRepository] };
export const asignarRolesUsuarioUseCaseProvider = { provide: AsignarRolesUsuarioUseCase, useFactory: (repo: UsuarioRepository) => new AsignarRolesUsuarioUseCase(repo), deps: [UsuarioRepository] };

//#endregion

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    // Repositorios <-> Servicios HTTP (Inversión de Dependencias)
    { provide: AuthRepository, useClass: AuthService },
    { provide: CalculadoraRepository, useClass: CalculadoraService },
    { provide: CatalogoRepository, useClass: CatalogoService },
    { provide: AdminConfigRepository, useClass: AdminConfigService },
    { provide: UsuarioRepository, useClass: UsuarioService },

    // Inyección de Casos de Uso
    loginUseCaseProvider,

    calcularCotizacionUseCaseProvider,
    crearCotizacionUseCaseProvider,
    obtenerCotizacionUseCaseProvider,
    listarCotizacionesUseCaseProvider,
    actualizarEstadoCotizacionUseCaseProvider,
    asignarCostoDomicilioUseCaseProvider,
    obtenerAdicionalesUseCaseProvider,

    obtenerServiciosUseCaseProvider,
    guardarServicioUseCaseProvider,
    desactivarServicioUseCaseProvider,
    obtenerProductosUseCaseProvider,
    guardarProductoUseCaseProvider,
    desactivarProductoUseCaseProvider,
    obtenerMarcasUseCaseProvider,
    guardarMarcaUseCaseProvider,
    desactivarMarcaUseCaseProvider,
    obtenerPresentacionesUseCaseProvider,
    guardarPresentacionUseCaseProvider,
    desactivarPresentacionUseCaseProvider,
    obtenerMaterialesUseCaseProvider,
    guardarMaterialUseCaseProvider,
    obtenerVariantesUseCaseProvider,
    guardarVarianteUseCaseProvider,
    obtenerArchivosUseCaseProvider,

    obtenerGeneralesUseCaseProvider,
    guardarGeneralUseCaseProvider,
    obtenerEmpresaUseCaseProvider,
    guardarEmpresaUseCaseProvider,
    obtenerMotoresUseCaseProvider,
    guardarMotorUseCaseProvider,
    desactivarMotorUseCaseProvider,
    obtenerModosUseCaseProvider,
    guardarModoUseCaseProvider,
    desactivarModoUseCaseProvider,

    obtenerUsuariosUseCaseProvider,
    crearUsuarioUseCaseProvider,
    actualizarUsuarioUseCaseProvider,
    cambiarEstadoUsuarioUseCaseProvider,
    cambiarPasswordUsuarioUseCaseProvider,
    asignarRolesUsuarioUseCaseProvider
  ]
})
export class DatosModule { }