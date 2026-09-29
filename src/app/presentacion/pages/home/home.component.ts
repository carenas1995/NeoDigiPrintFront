import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObtenerServiciosUseCase } from '../../../dominio/caso-uso/catalogo/ObtenerServiciosUseCase';
import { ServicioDto } from '../../../dominio/interface/servicio-catalogos.interface';
import { ProyectoRealizado } from '../../../dominio/interface/ProyectoRealizado';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  servicios: ServicioDto[] = [];
  cargando: boolean = false;
  contacto: string = "neodigiprint1@gmail.com";

  proyectosRealizados: ProyectoRealizado[] = [
    {
      id: 1,
      tipo: 'video',
      archivo: 'balcon_batman_joker.mp4',
      poster: 'poster_batman_joker.jpg',
      categoriaKey: 'SERVICIOS.GRAN_FORMATO.TITULO',
      tituloKey: 'PORTAFOLIO.BATMAN_JOKER_TITULO',
      descKey: 'PORTAFOLIO.BATMAN_JOKER_DESC'
    },
    {
      id: 2,
      tipo: 'video',
      archivo: 'instalacion_polarizado.mp4',
      poster: 'poster_polarizado.jpg',
      categoriaKey: 'SERVICIOS.POLARIZADO.TITULO',
      tituloKey: 'PORTAFOLIO.POLARIZADO_TITULO',
      descKey: 'PORTAFOLIO.POLARIZADO_DESC'
    },
    {
      id: 3,
      tipo: 'imagen',
      archivo: 'stickers_troquelados.jpg',
      categoriaKey: 'SERVICIOS.STICKERS.TITULO',
      tituloKey: 'PORTAFOLIO.STICKERS_TITULO',
      descKey: 'PORTAFOLIO.STICKERS_DESC'
    },
    {
      id: 4,
      tipo: 'imagen',
      archivo: 'tarjeteria_acabados.jpg',
      categoriaKey: 'SERVICIOS.TARJETERIA.TITULO',
      tituloKey: 'PORTAFOLIO.TARJETAS_TITULO',
      descKey: 'PORTAFOLIO.TARJETAS_DESC'
    }
  ];

  constructor(
    private obtenerServiciosUseCase: ObtenerServiciosUseCase,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarServicios();
  }

  private cargarServicios(): void {
    this.cargando = true;
    this.obtenerServiciosUseCase.execute().subscribe({
      next: (data: ServicioDto[]) => {
        this.servicios = data;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al obtener servicios:', err);
        this.cargando = false;
      }
    });
  }

  onImgError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/img/servicios/default.jpg';
  }

  irACalculadora(servicioId?: number): void {
    if (servicioId) {
      this.router.navigate(['/calculadora'], { queryParams: { servicioId } });
    } else {
      this.router.navigate(['/calculadora']);
    }
  }

  abrirWhatsApp(): void {
    const mensaje = encodeURIComponent('Hola, me gustaría solicitar información y cotizar un proyecto.');
    window.open(`https://wa.me/573000000000?text=${mensaje}`, '_blank');
  }
}