import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PresentacionDto, ProductoDto } from '../../../dominio/interface/producto.interface';
import { MarcaDto } from '../../../dominio/interface/marca.interface';
import { MaterialDto } from '../../../dominio/interface/material.interface';
import { ObtenerMarcasUseCase } from '../../../dominio/caso-uso/catalogo/ObtenerMarcasUseCase';
import { GuardarMarcaUseCase } from '../../../dominio/caso-uso/catalogo/GuardarMarcaUseCase';
import { ObtenerPresentacionesUseCase } from '../../../dominio/caso-uso/catalogo/ObtenerPresentacionesUseCase';
import { GuardarPresentacionUseCase } from '../../../dominio/caso-uso/catalogo/GuardarPresentacionUseCase';
import { ObtenerMaterialesUseCase } from '../../../dominio/caso-uso/catalogo/ObtenerMaterialesUseCase';
import { GuardarMaterialUseCase } from '../../../dominio/caso-uso/catalogo/GuardarMaterialUseCase';

@Component({
  selector: 'app-detalle-producto-config',
  templateUrl: './detalle-producto-config.component.html'
})
export class DetalleProductoConfigComponent implements OnInit, OnChanges {

  @Input() producto!: ProductoDto;
  marcas: MarcaDto[] = [];
  presentaciones: PresentacionDto[] = [];
  materiales: MaterialDto[] = [];

  mostrarModalMarca = false;
  mostrarModalPresentacion = false;
  mostrarModalMaterial = false;
  modoEdicion = false;

  formMarca!: FormGroup;
  formPresentacion!: FormGroup;
  formMaterial!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private obtenerMarcasUC: ObtenerMarcasUseCase,
    private guardarMarcaUC: GuardarMarcaUseCase,
    private obtenerPresentacionesUC: ObtenerPresentacionesUseCase,
    private guardarPresentacionUC: GuardarPresentacionUseCase,
    private obtenerMaterialesUC: ObtenerMaterialesUseCase,
    private guardarMaterialUC: GuardarMaterialUseCase
  ) {
    this.initFormularios();
  }

  ngOnInit(): void {
    if (this.producto?.id) {
      this.cargarDatosProducto();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['producto'] && !changes['producto'].firstChange && this.producto?.id) {
      this.cargarDatosProducto();
    }
  }

  private initFormularios(): void {
    this.formMarca = this.fb.group({
      id: [0],
      productoId: [0, Validators.required],
      nombre: ['', [Validators.required, Validators.maxLength(150)]],
      descripcion: [''],
      activo: [true]
    });

    this.formPresentacion = this.fb.group({
      id: [0],
      productoId: [0, Validators.required],
      nombre: ['', [Validators.required, Validators.maxLength(150)]],
      codigo: ['', [Validators.required, Validators.maxLength(50)]],
      activo: [true]
    });

    this.formMaterial = this.fb.group({
      id: [0],
      productoId: [0, Validators.required],
      nombre: ['', [Validators.required, Validators.maxLength(150)]],
      anchoMaximo: [0],
      altoMaximo: [0],
      activo: [true]
    });
  }

  cargarDatosProducto(): void {
    const productoId = this.producto.id;
    this.cargarMarcas(productoId);
    this.cargarPresentaciones(productoId);
    this.cargarMateriales(productoId);
  }

  // ==================== MARCAS ====================
  cargarMarcas(productoId: number): void {
    this.obtenerMarcasUC.execute(productoId).subscribe({
      next: (data) => (this.marcas = data),
      error: (err) => console.error('Error al cargar marcas', err)
    });
  }

  abrirCrearMarca(): void {
    this.modoEdicion = false;
    this.formMarca.reset({ id: 0, productoId: this.producto.id, activo: true });
    this.mostrarModalMarca = true;
  }

  abrirEditarMarca(marca: MarcaDto): void {
    this.modoEdicion = true;
    this.formMarca.patchValue(marca);
    this.mostrarModalMarca = true;
  }

  guardarMarca(): void {
    if (this.formMarca.invalid) return;

    const dto: MarcaDto = this.formMarca.value;
    this.guardarMarcaUC.execute(dto).subscribe({
      next: () => {
        this.mostrarModalMarca = false;
        this.cargarMarcas(this.producto.id);
      },
      error: (err) => console.error('Error al guardar marca', err)
    });
  }

  cargarPresentaciones(productoId: number): void {
    this.obtenerPresentacionesUC.execute(productoId).subscribe({
      next: (data) => (this.presentaciones = data),
      error: (err) => console.error('Error al cargar presentaciones', err)
    });
  }

  abrirCrearPresentacion(): void {
    this.modoEdicion = false;
    this.formPresentacion.reset({ id: 0, productoId: this.producto.id, activo: true });
    this.mostrarModalPresentacion = true;
  }

  abrirEditarPresentacion(presentacion: PresentacionDto): void {
    this.modoEdicion = true;
    this.formPresentacion.patchValue(presentacion);
    this.mostrarModalPresentacion = true;
  }

  guardarPresentacion(): void {
    if (this.formPresentacion.invalid) return;

    const dto: PresentacionDto = this.formPresentacion.value;
    this.guardarPresentacionUC.execute(dto).subscribe({
      next: () => {
        this.mostrarModalPresentacion = false;
        this.cargarPresentaciones(this.producto.id);
      },
      error: (err) => console.error('Error al guardar presentación', err)
    });
  }

  cargarMateriales(productoId: number): void {
    this.obtenerMaterialesUC.execute(productoId).subscribe({
      next: (data) => (this.materiales = data),
      error: (err) => console.error('Error al cargar materiales', err)
    });
  }

  abrirCrearMaterial(): void {
    this.modoEdicion = false;
    this.formMaterial.reset({ id: 0, productoId: this.producto.id, activo: true });
    this.mostrarModalMaterial = true;
  }

  abrirEditarMaterial(material: MaterialDto): void {
    this.modoEdicion = true;
    this.formMaterial.patchValue(material);
    this.mostrarModalMaterial = true;
  }

  guardarMaterial(): void {
    if (this.formMaterial.invalid) return;

    const dto: MaterialDto = this.formMaterial.value;
    this.guardarMaterialUC.execute(dto).subscribe({
      next: () => {
        this.mostrarModalMaterial = false;
        this.cargarMateriales(this.producto.id);
      },
      error: (err) => console.error('Error al guardar material', err)
    });
  }
}