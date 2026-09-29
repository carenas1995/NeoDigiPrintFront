import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componente Layout principal
import { PagesComponent } from './pages.component';
import { authorizateGuard } from '../guards/authorizate.guard';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { HomeComponent } from './home/home.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { CatalogosComponent } from './catalogo/catalogo.component';
import { AdminContainerComponent } from './configuracion/admin-container.component';

// Importación de componentes


const routes: Routes = [
  {
    path: '',
    component: PagesComponent, // Wrapper (Sidebar + Navbar)
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'calculadora',
        component: CalculadoraComponent
      },
      {
        path: 'configuracion',
        component: AdminContainerComponent,
        canActivate: [authorizateGuard]
      },
      {
        path: 'catalogos',
        component: AdminContainerComponent,
        canActivate: [authorizateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }