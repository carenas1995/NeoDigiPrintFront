import { Component, OnInit } from '@angular/core';
import { ObtenerServiciosUseCase } from '../../../dominio/caso-uso/catalogo/ObtenerServiciosUseCase';
import { ServicioDto } from '../../../dominio/interface/servicio-catalogos.interface';
import { TranslateService } from '@ngx-translate/core';
import { ObtenerEmpresaUseCase } from '../../../dominio/caso-uso/config/ObtenerEmpresaUseCase';
import { ObtenerGeneralesUseCase } from '../../../dominio/caso-uso/config/ObtenerGeneralesUseCase';
import { ObtenerMotoresUseCase } from '../../../dominio/caso-uso/config/ObtenerMotoresUseCase';
import { ConfiguracionEmpresaDto } from '../../../dominio/interface/configuracion.interface';

@Component({
  selector: 'app-admin-configuracion',
  templateUrl: './configuracion.component.html'
})
export class ConfiguracionComponent implements OnInit {

  empresa: ConfiguracionEmpresaDto | null = null;
  generales: any[] = [];
  motores: any[] = [];

  constructor(
    private obtenerEmpresaUC: ObtenerEmpresaUseCase,
    private obtenerGeneralesUC: ObtenerGeneralesUseCase,
    private obtenerMotoresUC: ObtenerMotoresUseCase,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.obtenerEmpresaUC.execute().subscribe(data => this.empresa = data);
    this.obtenerGeneralesUC.execute().subscribe(data => this.generales = data);
    this.obtenerMotoresUC.execute().subscribe(data => this.motores = data);
  }
}
