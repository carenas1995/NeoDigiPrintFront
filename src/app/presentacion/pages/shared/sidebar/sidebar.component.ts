import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../datos/http-servicios/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  logueado: Boolean = false;
  superadd: Boolean = false;
  usuario: any;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.logueado$.subscribe(esLogueado => {
      this.logueado = esLogueado;
      if (this.logueado) {
        this.usuario = this.authService.getUserData();
        this.superadd = this.usuario.roles.includes("SUPERADMIN");
      } else {
        this.usuario = null;
        this.superadd = false;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}
