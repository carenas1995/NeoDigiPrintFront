import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import { TranslateService } from '@ngx-translate/core';
import { CalcularCotizacionUseCase } from '../../../dominio/caso-uso/calculadora/CalcularCotizacionUseCase';
import { CrearCotizacionUseCase } from '../../../dominio/caso-uso/calculadora/CrearCotizacionUseCase';
import { ObtenerAdicionalesUseCase } from '../../../dominio/caso-uso/calculadora/ObtenerAdicionalesUseCase';
import { ObtenerMaterialesUseCase } from '../../../dominio/caso-uso/catalogo/ObtenerMaterialesUseCase';
import { ObtenerProductosUseCase } from '../../../dominio/caso-uso/catalogo/ObtenerProductosUseCase';
import { ObtenerServiciosUseCase } from '../../../dominio/caso-uso/catalogo/ObtenerServiciosUseCase';
import { AuthService } from '../../../datos/http-servicios/auth.service';
import { AdicionalDto } from '../../../dominio/interface/adicional.interface';
import { CotizacionResultadoCalculoDto, CalcularCotizacionDto, CotizacionGuardadaDto } from '../../../dominio/interface/cotizacion.interface';
import { MaterialDto } from '../../../dominio/interface/material.interface';
import { PiezaCanvas, PiezaCanvasBox, PiezaMedida } from '../../../dominio/interface/PiezaMedida';
import { ProductoDto, ProductoConfiguracionDto, PresentacionDto } from '../../../dominio/interface/producto.interface';
import { ServicioDto } from '../../../dominio/interface/servicio-catalogos.interface';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html'
})
export class CalculadoraComponent implements OnInit {

  @ViewChild('corteCanvas') corteCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasPlotter') canvasPlotterRef!: ElementRef;

  logueado: boolean = false;
  cargando: boolean = true;

  servicios: ServicioDto[] = [];
  productos: ProductoDto[] = [];
  materiales: MaterialDto[] = [];
  adicionalesDisponibles: AdicionalDto[] = [];

  servicioIdSeleccionado: number = 0;
  productoIdSeleccionado: number = 0;
  materialIdSeleccionado: number = 0;

  esViniloArquitectonico: boolean = false;
  esPolarizado: boolean = false;
  esGranFormato: boolean = false;
  esTarjeteria: boolean = false;
  esVolantes: boolean = false;
  esStickers: boolean = false;

  configuracionActual?: ProductoConfiguracionDto;
  presentacionActual?: PresentacionDto;
  anchoMaximoMaterial: number = 122;

  tipoImpresionTarjeteria: string = '1_CARA';
  opcionesImpresionTarjetas = [
    { id: '1_CARA', nombreKey: 'CALCULADORA.TARJETAS.UNA_CARA_TITULO', descripcionKey: 'CALCULADORA.TARJETAS.UNA_CARA_DESC' },
    { id: '2_CARAS_REVERSO', nombreKey: 'CALCULADORA.TARJETAS.DOS_CARAS_COT_TITULO', descripcionKey: 'CALCULADORA.TARJETAS.DOS_CARAS_COT_DESC' },
    { id: '2_CARAS_FULL', nombreKey: 'CALCULADORA.TARJETAS.DOS_CARAS_FULL_TITULO', descripcionKey: 'CALCULADORA.TARJETAS.DOS_CARAS_FULL_DESC' },
    { id: 'UV_MATE', nombreKey: 'CALCULADORA.TARJETAS.UV_MATE_TITULO', descripcionKey: 'CALCULADORA.TARJETAS.UV_MATE_DESC' }
  ];
  escalasCantidad: { label: string, valor: number }[] = [];

  piezasMedidas: PiezaMedida[] = [{ ancho: 0, alto: 0, cantidad: 1 }];
  cantidadUnidades: number = 1000;
  requiereInstalacion: boolean = false;
  adicionalesSeleccionados: number[] = [];

  resultadoCalculo?: CotizacionResultadoCalculoDto;

  mostrarModalCliente: boolean = false;
  enviandoCotizacion: boolean = false;
  datosCliente = {
    nombre: '',
    telefono: '',
    email: ''
  };

  private ultimoServicioId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private translate: TranslateService,
    private obtenerServiciosUseCase: ObtenerServiciosUseCase,
    private obtenerProductosUseCase: ObtenerProductosUseCase,
    private obtenerMaterialesUseCase: ObtenerMaterialesUseCase,
    private obtenerAdicionalesUseCase: ObtenerAdicionalesUseCase,
    private calcularCotizacionUseCase: CalcularCotizacionUseCase,
    private crearCotizacionUseCase: CrearCotizacionUseCase
  ) { }

  ngOnInit(): void {
    this.logueado = this.authService.hasToken();
    this.cargarServiciosYEvaluarURL();
  }

  cargarServiciosYEvaluarURL(): void {
    this.cargando = true;
    this.obtenerServiciosUseCase.execute().subscribe({
      next: (resServicios) => {
        this.servicios = resServicios;
        this.route.queryParams.subscribe(params => {
          const idParam = Number(params['servicioId'] || params['servicio']);
          if (idParam && this.servicios.some(s => s.id === idParam)) {
            this.servicioIdSeleccionado = idParam;
            this.ultimoServicioId = idParam;
            this.onServicioChange(true);
          }
          this.cargando = false;
        });
      }
    });
  }

  async onServicioChange(esPrecargaInicial = false): Promise<void> {
    const tieneProgreso = this.piezasMedidas.some(p => p.ancho > 0 || p.alto > 0) || this.piezasMedidas.length > 1;

    if (tieneProgreso && !esPrecargaInicial) {
      const resultado = await Swal.fire({
        title: this.translate.instant('CONFIRMACION.TITULO') || '¿Confirmar cambio?',
        text: this.translate.instant('CONFIRMACION.TEXTO') || 'Se perderán las dimensiones y cantidades actuales.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00ea91',
        cancelButtonColor: '#f87171',
        confirmButtonText: this.translate.instant('CONFIRMACION.BTN_ACEPTAR') || 'Sí, cambiar',
        cancelButtonText: this.translate.instant('CONFIRMACION.BTN_CANCELAR') || 'Cancelar',
        background: '#1e293b',
        color: '#ffffff'
      });

      if (!resultado.isConfirmed) {
        this.servicioIdSeleccionado = this.ultimoServicioId;
        return;
      }
    }

    this.cargando = true;
    this.ultimoServicioId = this.servicioIdSeleccionado;
    this.resetFormulario();

    const servicioSel = this.servicios.find(s => s.id === this.servicioIdSeleccionado);
    if (!servicioSel) {
      this.cargando = false;
      return;
    }

    const codServ = servicioSel.codigo?.toUpperCase() || '';
    this.esViniloArquitectonico = codServ.includes('VINILARQUITEC') || codServ.includes('ARQUITECTONICO');
    this.esPolarizado = codServ.includes('POLARIZADO');
    this.esGranFormato = codServ.includes('GRAN_FORMATO') || codServ.includes('IMPRESION');

    if (this.esViniloArquitectonico) {
      this.requiereInstalacion = true;
    }

    if (this.servicioIdSeleccionado > 0) {
      this.obtenerProductosUseCase.execute(this.servicioIdSeleccionado).subscribe({
        next: (res) => {
          this.productos = res;
          this.cargando = false;
        },
        error: () => { this.cargando = false; }
      });

      if (this.logueado) {
        this.obtenerAdicionalesUseCase.execute(this.servicioIdSeleccionado).subscribe({
          next: (res) => { this.adicionalesDisponibles = res; }
        });
      }
    } else {
      this.cargando = false;
    }
  }

  onProductoChange(): void {
    this.cargando = true;
    this.materiales = [];
    this.materialIdSeleccionado = 0;
    this.configuracionActual = undefined;
    this.presentacionActual = undefined;
    this.resultadoCalculo = undefined;
    this.escalasCantidad = [];

    const productoSel = this.productos.find(p => p.id === this.productoIdSeleccionado);
    if (!productoSel) {
      this.cargando = false;
      return;
    }

    const codProd = productoSel.codigo?.toUpperCase() || '';
    this.esTarjeteria = codProd.includes('TARJETA');
    this.esVolantes = codProd.includes('VOLANTE');
    this.esStickers = codProd.includes('STICKER') || codProd.includes('ETIQUETA');

    if (this.esTarjeteria || this.esVolantes) {
      this.escalasCantidad = [
        { label: 'CALCULADORA.ESCALAS.MILLAR_1', valor: 1000 },
        { label: 'CALCULADORA.ESCALAS.MILLAR_2', valor: 2000 },
        { label: 'CALCULADORA.ESCALAS.MILLAR_3', valor: 3000 },
        { label: 'CALCULADORA.ESCALAS.MILLAR_5', valor: 5000 },
        { label: 'CALCULADORA.ESCALAS.MILLAR_10', valor: 10000 }
      ];
      this.cantidadUnidades = 1000;
    } else if (this.esStickers) {
      this.escalasCantidad = [
        { label: 'CALCULADORA.ESCALAS.UNIDADES_100', valor: 100 },
        { label: 'CALCULADORA.ESCALAS.UNIDADES_200', valor: 200 },
        { label: 'CALCULADORA.ESCALAS.UNIDADES_500', valor: 500 },
        { label: 'CALCULADORA.ESCALAS.UNIDADES_1000', valor: 1000 }
      ];
      this.cantidadUnidades = 100;
    }

    if (this.productoIdSeleccionado > 0) {
      this.obtenerMaterialesUseCase.execute(this.productoIdSeleccionado).subscribe({
        next: (res) => {
          this.materiales = res;
          this.cargando = false;
        },
        error: () => { this.cargando = false; }
      });
    } else {
      this.cargando = false;
    }
  }

  onMaterialChange(): void {
    if (this.materialIdSeleccionado > 0) {
      const materialSel = this.materiales.find(m => m.id === this.materialIdSeleccionado) as any;

      this.configuracionActual = materialSel?.configuracion || materialSel?.variantes?.[0]?.configuracion || {
        id: this.materialIdSeleccionado,
        tipoCalculo: (this.esTarjeteria || this.esVolantes || this.esStickers) ? 'ESCALA' : 'AREA',
        permiteInstalacion: !this.esViniloArquitectonico,
        permiteLaminado: true,
        activo: true
      };

      this.presentacionActual = materialSel?.presentacion || materialSel?.variantes?.[0]?.presentacion;
      //this.anchoMaximoMaterial = materialSel?.anchoMaximo || this.presentacionActual?.anchoRealCm || 152;

      this.ejecutarCalculoEnVivo();
    } else {
      this.configuracionActual = undefined;
      this.presentacionActual = undefined;
      this.resultadoCalculo = undefined;
    }
  }

  agregarPieza(): void {
    this.piezasMedidas.push({ ancho: 0, alto: 0, cantidad: 1 });
  }

  eliminarPieza(index: number): void {
    if (this.piezasMedidas.length > 1) {
      this.piezasMedidas.splice(index, 1);
      this.ejecutarCalculoEnVivo();
    }
  }

  toggleAdicional(id: number): void {
    const idx = this.adicionalesSeleccionados.indexOf(id);
    if (idx > -1) {
      this.adicionalesSeleccionados.splice(idx, 1);
    } else {
      this.adicionalesSeleccionados.push(id);
    }
    this.ejecutarCalculoEnVivo();
  }

  get piezasOptimizedForCanvas() {
    if (!this.configuracionActual) return [];

    let piezasIndividuales: { ancho: number; alto: number; originalIndex: number }[] = [];
    const anchoRollo = this.anchoMaximoMaterial || 122;

    this.piezasMedidas.forEach((p, idx) => {
      if (p.ancho > 0 && p.alto > 0) {
        for (let i = 0; i < p.cantidad; i++) {
          piezasIndividuales.push({ ancho: p.ancho, alto: p.alto, originalIndex: idx });
        }
      }
    });

    piezasIndividuales.sort((a, b) => (b.ancho * b.alto) - (a.ancho * a.alto));
    let colocadas: PiezaCanvasBox[] = [];

    piezasIndividuales.forEach(pieza => {
      let orientaciones = [
        { w: pieza.ancho, h: pieza.alto, rotada: false },
        { w: pieza.alto, h: pieza.ancho, rotada: true }
      ].filter(o => o.h <= anchoRollo);

      let mejorOpcion: { x: number; y: number; w: number; h: number; rotada: boolean } | any = null;
      let minMetrajeHorizontal = Infinity;

      const puntosCandidatos: { x: number; y: number }[] = [{ x: 0, y: 0 }];

      colocadas.forEach(c => {
        puntosCandidatos.push({ x: c.x + c.ancho, y: c.y });
        puntosCandidatos.push({ x: c.x, y: c.y + c.alto });
        puntosCandidatos.push({ x: c.x, y: c.y + c.alto });
      });

      const columnasX = Array.from(new Set(colocadas.map(c => c.x)));
      columnasX.forEach(colX => {
        puntosCandidatos.push({ x: colX, y: 0 });
        colocadas.forEach(c => {
          if (c.x === colX) {
            puntosCandidatos.push({ x: colX, y: c.y + c.alto });
          }
        });
      });

      orientaciones.forEach(op => {
        puntosCandidatos.forEach(punto => {
          if (punto.y + op.h <= anchoRollo) {

            let colisiona = false;
            for (let c of colocadas) {
              if (!(punto.x + op.w <= c.x || punto.x >= c.x + c.ancho || punto.y + op.h <= c.y || punto.y >= c.y + c.alto)) {
                colisiona = true;
                break;
              }
            }

            if (!colisiona) {
              let maxDerecha = punto.x + op.w;
              colocadas.forEach(c => {
                const der = c.x + c.ancho;
                if (der > maxDerecha) maxDerecha = der;
              });

              if (maxDerecha < minMetrajeHorizontal ||
                (maxDerecha === minMetrajeHorizontal && punto.y < (mejorOpcion?.y || Infinity))) {
                minMetrajeHorizontal = maxDerecha;
                mejorOpcion = {
                  x: punto.x,
                  y: punto.y,
                  w: op.w,
                  h: op.h,
                  rotada: op.rotada
                };
              }
            }
          }
        });
      });

      if (mejorOpcion) {
        colocadas.push({
          ancho: mejorOpcion.w,
          alto: mejorOpcion.h,
          originalIndex: pieza.originalIndex,
          x: mejorOpcion.x,
          y: mejorOpcion.y,
          rotada: mejorOpcion.rotada
        });
      }
    });

    return colocadas;
  }

  get metrajeLinealTotal(): { centimetros: number; metros: number } {
    const colocadas = this.piezasOptimizedForCanvas;
    if (colocadas.length === 0) return { centimetros: 0, metros: 0 };

    let maxX = 0;
    colocadas.forEach(p => {
      const extremoDerecho = p.x + p.ancho;
      if (extremoDerecho > maxX) maxX = extremoDerecho;
    });

    return {
      centimetros: Math.round(maxX),
      metros: Number((maxX / 100).toFixed(2))
    };
  }

  get piezaSuponeExceso(): boolean {
    return this.piezasMedidas.some(p => p.ancho > this.anchoMaximoMaterial && p.alto > this.anchoMaximoMaterial);
  }

  get piezasValidas(): boolean {
    return this.piezasMedidas.length > 0 && this.piezasMedidas.every(p => p.ancho > 0 && p.alto > 0 && p.cantidad > 0) && !this.piezaSuponeExceso;
  }

  private construirPayloadItems(): any[] {
    if (!this.configuracionActual) return [];

    const extras = {
      tipoImpresionTarjeteria: this.esTarjeteria ? this.tipoImpresionTarjeteria : null,
      productoPresentacionId: this.presentacionActual?.id || this.configuracionActual.productoPresentacionId
    };

    const esModoArea = ['AREA', 'ML', 'LINEAL'].includes(this.configuracionActual.tipoCalculo + '');

    if (esModoArea) {
      return this.piezasMedidas
        .filter(p => p.ancho > 0 && p.alto > 0)
        .map(p => ({
          productoConfiguracionId: this.configuracionActual!.id,
          cantidad: p.cantidad,
          anchoCm: p.ancho,
          largoCm: p.alto,
          requiereInstalacion: this.requiereInstalacion,
          adicionalIds: this.logueado ? this.adicionalesSeleccionados : [],
          ...extras
        }));
    } else {
      return [{
        productoConfiguracionId: this.configuracionActual.id,
        cantidad: this.cantidadUnidades,
        anchoCm: 0,
        largoCm: 0,
        requiereInstalacion: this.requiereInstalacion,
        adicionalIds: this.logueado ? this.adicionalesSeleccionados : [],
        ...extras
      }];
    }
  }

  ejecutarCalculoEnVivo(): void {
    if (!this.configuracionActual) return;

    const items = this.construirPayloadItems();
    if (items.length === 0) {
      this.resultadoCalculo = undefined;
      return;
    }

    const payload: CalcularCotizacionDto = {
      clienteNombre: 'Anonimo',
      clienteEmail: '',
      clienteTelefono: '',
      items: items
    };

    this.calcularCotizacionUseCase.execute(payload).subscribe({
      next: (res) => (this.resultadoCalculo = res)
    });
  }

  async exportarEsquemaCanvas(): Promise<void> {
    const el = this.corteCanvas?.nativeElement || this.canvasPlotterRef?.nativeElement;
    if (!el) return;

    try {
      const canvas = await html2canvas(el, { backgroundColor: '#0f172a', scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = imgData;
      link.download = `Neo_Esquema_${this.servicioIdSeleccionado}_${this.anchoMaximoMaterial}cm.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error al exportar esquema:', err);
    }
  }

  abrirModalContacto(): void {
    if (this.construirPayloadItems().length === 0) return;
    this.mostrarModalCliente = true;
  }

  cerrarModalContacto(): void {
    this.mostrarModalCliente = false;
  }

  confirmarYGenerarCotizacion(): void {
    if (!this.datosCliente.nombre || !this.datosCliente.telefono) return;

    this.enviandoCotizacion = true;
    const payload: CalcularCotizacionDto = {
      clienteNombre: this.datosCliente.nombre,
      clienteTelefono: this.datosCliente.telefono,
      clienteEmail: this.datosCliente.email || '',
      items: this.construirPayloadItems()
    };

    this.crearCotizacionUseCase.execute(payload).subscribe({
      next: (res: CotizacionGuardadaDto) => {
        this.enviandoCotizacion = false;
        this.mostrarModalCliente = false;
        if (res.urlWhatsApp) {
          window.open(res.urlWhatsApp, '_blank');
        }
      },
      error: () => {
        this.enviandoCotizacion = false;
      }
    });
  }

  resetFormulario(): void {
    this.productos = [];
    this.materiales = [];
    this.adicionalesDisponibles = [];
    this.productoIdSeleccionado = 0;
    this.materialIdSeleccionado = 0;
    this.configuracionActual = undefined;
    this.presentacionActual = undefined;
    this.resultadoCalculo = undefined;
    this.piezasMedidas = [{ ancho: 0, alto: 0, cantidad: 1 }];
    this.adicionalesSeleccionados = [];
    this.mostrarModalCliente = false;
    this.esViniloArquitectonico = false;
    this.esPolarizado = false;
    this.esGranFormato = false;
    this.esTarjeteria = false;
    this.esVolantes = false;
    this.esStickers = false;
    this.tipoImpresionTarjeteria = '1_CARA';
    this.requiereInstalacion = false;
  }
}