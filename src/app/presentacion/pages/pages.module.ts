import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DatosModule } from '../../datos/datos.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { CatalogosComponent } from './catalogo/catalogo.component';
import { AdminContainerComponent } from './configuracion/admin-container.component';
import { DetalleProductoConfigComponent } from './catalogo/detalle-producto-config.component';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    CalculadoraComponent,
    ConfiguracionComponent,
    AdminContainerComponent,
    CatalogosComponent,
    DetalleProductoConfigComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    DatosModule,
    FormsModule,
    TranslateModule
  ],
  exports: [PagesComponent, SharedModule, TranslateModule]
})
export class PagesModule { }
