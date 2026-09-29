import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authRutasGuard } from './presentacion/guards/authorizate.guard';
import { LoginComponent } from './presentacion/pages/login/login.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [authRutasGuard] // Si el usuario ya tiene cookie activa, no entra a login
  },
  { 
    path: '', 
    loadChildren: () => import('./presentacion/pages/pages.module').then(m => m.PagesModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }