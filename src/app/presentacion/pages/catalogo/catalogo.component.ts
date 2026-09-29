import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ObtenerServiciosUseCase } from '../../../dominio/caso-uso/catalogo/ObtenerServiciosUseCase';
import { ServicioDto } from '../../../dominio/interface/servicio-catalogos.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DesactivarProductoUseCase } from '../../../dominio/caso-uso/catalogo/DesactivarProductoUseCase';
import { DesactivarServicioUseCase } from '../../../dominio/caso-uso/catalogo/DesactivarServicioUseCase';
import { GuardarProductoUseCase } from '../../../dominio/caso-uso/catalogo/GuardarProductoUseCase';
import { GuardarServicioUseCase } from '../../../dominio/caso-uso/catalogo/GuardarServicioUseCase';
import { ObtenerProductosUseCase } from '../../../dominio/caso-uso/catalogo/ObtenerProductosUseCase';
import { ProductoDto } from '../../../dominio/interface/producto.interface';
import { NivelCatalogo, BreadcrumbItem } from '../../../dominio/interface/NivelCatalogo';

@Component({
  selector: 'app-admin-catalogo',
  templateUrl: './catalogo.component.html'
})
export class CatalogosComponent implements OnInit {

  nivelActual: NivelCatalogo = 'SERVICIOS';
  breadcrumbs: BreadcrumbItem[] = [{ label: 'Servicios', nivel: 'SERVICIOS' }];

  servicios: ServicioDto[] = [];
  productos: ProductoDto[] = [];

  servicioSeleccionado: ServicioDto | null = null;
  productoSeleccionado: ProductoDto | null = null;

  formServicio!: FormGroup;
  formProducto!: FormGroup;
  mostrarModalServicio = false;
  mostrarModalProducto = false;
  modoEdicion = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private obtenerServiciosUC: ObtenerServiciosUseCase,
    private guardarServicioUC: GuardarServicioUseCase,
    private desactivarServicioUC: DesactivarServicioUseCase,
    private obtenerProductosUC: ObtenerProductosUseCase,
    private guardarProductoUC: GuardarProductoUseCase,
    private desactivarProductoUC: DesactivarProductoUseCase
  ) {
    this.initFormularios();
  }

  ngOnInit(): void {
    this.cargarServicios();
  }

  private initFormularios(): void {
    this.formServicio = this.fb.group({
      id: [0],
      nombre: ['', [Validators.required, Validators.maxLength(150)]],
      codigo: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: [''],
      motorCalculoId: [1, Validators.required],
      activo: [true]
    });

    this.formProducto = this.fb.group({
      id: [0],
      servicioId: [0, Validators.required],
      nombre: ['', [Validators.required, Validators.maxLength(150)]],
      codigo: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: [''],
      activo: [true]
    });
  }

  irANivel(item: BreadcrumbItem, index: number): void {
    this.breadcrumbs = this.breadcrumbs.slice(0, index + 1);
    this.nivelActual = item.nivel;

    if (item.nivel === 'SERVICIOS') {
      this.servicioSeleccionado = null;
      this.productoSeleccionado = null;
      this.actualizarQueryParams({ servicioId: null, productoId: null });
    } else if (item.nivel === 'PRODUCTOS') {
      this.productoSeleccionado = null;
      this.actualizarQueryParams({ servicioId: this.servicioSeleccionado?.id, productoId: null });
    }
  }

  private actualizarQueryParams(queryParams: { servicioId?: number | null; productoId?: number | null }): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  cargarServicios(): void {
    this.obtenerServiciosUC.execute().subscribe({
      next: (servs) => {
        this.servicios = servs;

        // Lee los parámetros presentes en la URL si el usuario recarga la página
        this.route.queryParams.subscribe(params => {
          const servicioId = params['servicioId'] ? Number(params['servicioId']) : null;
          const productoId = params['productoId'] ? Number(params['productoId']) : null;

          if (servicioId) {
            const serv = this.servicios.find(s => s.id === servicioId);
            if (serv) {
              this.servicioSeleccionado = serv;
              this.nivelActual = 'PRODUCTOS';
              this.obtenerProductosUC.execute(servicioId).subscribe(prods => {
                this.productos = prods;
                if (productoId) {
                  const prod = this.productos.find(p => p.id === productoId);
                  if (prod) {
                    this.productoSeleccionado = prod;
                    this.nivelActual = 'DETALLE_PRODUCTO';
                  }
                }
              });
            }
          }
        });
      }
    });
  }

  abrirCrearServicio(): void {
    this.modoEdicion = false;
    this.formServicio.reset({ id: 0, motorCalculoId: 1, activo: true });
    this.mostrarModalServicio = true;
  }

  abrirEditarServicio(servicio: ServicioDto, event?: Event): void {
    if (event) event.stopPropagation();
    this.modoEdicion = true;
    this.formServicio.patchValue(servicio);
    this.mostrarModalServicio = true;
  }

  guardarServicio(): void {
    if (this.formServicio.invalid) return;

    const dto: ServicioDto = this.formServicio.value;
    this.guardarServicioUC.execute(dto).subscribe({
      next: () => {
        this.mostrarModalServicio = false;
        this.cargarServicios();
      },
      error: (err) => console.error('Error al guardar servicio', err)
    });
  }

  eliminarServicio(servicio: ServicioDto, event: Event): void {
    event.stopPropagation();
    if (confirm(`¿Está seguro de desactivar el servicio "${servicio.nombre}"?`)) {
      this.desactivarServicioUC.execute(servicio.id).subscribe({
        next: () => this.cargarServicios(),
        error: (err) => console.error('Error al desactivar servicio', err)
      });
    }
  }

  volver(): void {
    if (this.breadcrumbs.length > 1) {
      const anteriorIndex = this.breadcrumbs.length - 2;
      this.irANivel(this.breadcrumbs[anteriorIndex], anteriorIndex);
    }
  }

  verProductosDeServicio(servicio: ServicioDto): void {
    this.servicioSeleccionado = servicio;
    this.nivelActual = 'PRODUCTOS';
    this.breadcrumbs.push({
      label: servicio.codigo,
      nivel: 'PRODUCTOS',
      id: servicio.id
    });
    this.actualizarQueryParams({ servicioId: servicio.id, productoId: null });
    this.cargarProductos(servicio.id);
  }

  cargarProductos(servicioId: number): void {
    this.obtenerProductosUC.execute(servicioId).subscribe({
      next: (data) => (this.productos = data),
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

  abrirCrearProducto(): void {
    if (!this.servicioSeleccionado) return;
    this.modoEdicion = false;
    this.formProducto.reset({
      id: 0,
      servicioId: this.servicioSeleccionado.id,
      activo: true
    });
    this.mostrarModalProducto = true;
  }

  abrirEditarProducto(producto: ProductoDto, event?: Event): void {
    if (event) event.stopPropagation();
    this.modoEdicion = true;
    this.formProducto.patchValue(producto);
    this.mostrarModalProducto = true;
  }

  guardarProducto(): void {
    if (this.formProducto.invalid) return;

    const dto: ProductoDto = this.formProducto.value;
    this.guardarProductoUC.execute(dto).subscribe({
      next: () => {
        this.mostrarModalProducto = false;
        if (this.servicioSeleccionado) {
          this.cargarProductos(this.servicioSeleccionado.id);
        }
      },
      error: (err) => console.error('Error al guardar producto', err)
    });
  }

  eliminarProducto(producto: ProductoDto, event: Event): void {
    event.stopPropagation();
    if (confirm(`¿Está seguro de desactivar el producto "${producto.nombre}"?`)) {
      this.desactivarProductoUC.execute(producto.id).subscribe({
        next: () => {
          if (this.servicioSeleccionado) {
            this.cargarProductos(this.servicioSeleccionado.id);
          }
        },
        error: (err) => console.error('Error al desactivar producto', err)
      });
    }
  }

  verDetalleProducto(producto: ProductoDto): void {
    this.productoSeleccionado = producto;
    this.nivelActual = 'DETALLE_PRODUCTO';
    this.breadcrumbs.push({
      label: producto.codigo,
      nivel: 'DETALLE_PRODUCTO',
      id: producto.id
    });
    this.actualizarQueryParams({
      servicioId: this.servicioSeleccionado?.id,
      productoId: producto.id
    });
  }
}
