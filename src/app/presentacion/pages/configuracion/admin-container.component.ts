import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html'
})
export class AdminContainerComponent implements OnInit {
  vistaActual: 'configuracion' | 'catalogo' = 'configuracion';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.vistaActual = window.location.href.includes('configuracion') ? 'configuracion' : 'catalogo';
  }

  cambiarVista(vista: 'configuracion' | 'catalogo'): void {
    this.vistaActual = vista;

    if (vista === 'configuracion') {
      this.router.navigate(['/configuracion']);
    } else {
      this.router.navigate(['/catalogos'], { queryParamsHandling: 'preserve' });
    }
  }
}