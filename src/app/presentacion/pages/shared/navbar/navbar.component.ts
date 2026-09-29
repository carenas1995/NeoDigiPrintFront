import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../datos/http-servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  terminoBusqueda: string = '';
  idiomaActual: string = 'es';
  logueado: boolean = false;
  usuario: any;

  @Output() buscar = new EventEmitter<string>();

  constructor(private translate: TranslateService, private authService: AuthService) { }

  ngOnInit(): void {
    this.idiomaActual = this.translate.currentLang || this.translate.defaultLang || 'es';
    this.authService.logueado$.subscribe(esLogueado => {
      this.logueado = esLogueado;
      if (this.logueado) {
        this.usuario = this.authService.getUserData();
      } else {
        this.usuario = null;
      }
    });
  }

  cambiarIdioma(lang: string): void {
    this.idiomaActual = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  onBuscar(): void {
    this.buscar.emit(this.terminoBusqueda);
  }
}