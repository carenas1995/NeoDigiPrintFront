import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-data-viewer-modal',
  templateUrl: './data-viewer-modal.component.html',
  styleUrls: ['./data-viewer-modal.component.css']
})
export class DataViewerModalComponent {
  @Input() file: Blob | undefined;
  @Input() nombreArchivo: string = '';
  @Input() tipo: string = '';
  @Output() closeModal = new EventEmitter<void>();

  workbookData: any[] = [];
  sheets: string[] = [];
  activeSheet: string = '';
  pdfBlobUrl: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnChanges() {
    if (!this.file) {
      return;
    }
    if (this.tipo == 'excel') {
      this.cargarExcel();
    }
    else {
      this.cargarPdf();
    }
  }

  cargarExcel() {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      this.sheets = workbook.SheetNames;
      this.activeSheet = this.sheets[0];

      this.workbookData = this.sheets.map(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[];

        if (data.length > 0 && Array.isArray(data[0])) {
          data[0] = data[0].map((header: any) => this.capitalizarTexto(header));
        }

        return {
          name: sheetName,
          data: data
        };
      });
    };

    if (this.file) {
      reader.readAsArrayBuffer(this.file);
    }
  }

  capitalizarTexto(texto: string): string {
    if (!texto) return texto;
    return texto
      .toString()
      .toLowerCase()
      .split(' ')
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(' ');
  }

  cambiarHoja(sheetName: string) {
    this.activeSheet = sheetName;
  }

  obtenerDatosHojaActiva() {
    const sheet = this.workbookData.find(s => s.name === this.activeSheet);
    return sheet ? sheet.data : [];
  }

  descargarExcel() {
    if (this.file) {
      const url = window.URL.createObjectURL(this.file);
      const link = document.createElement('a');
      link.href = url;
      link.download = this.nombreArchivo;
      link.click();
      window.URL.revokeObjectURL(url);
    }
  }

  cargarPdf() {
    if (!this.file) return;
    const objectUrl = URL.createObjectURL(this.file);
    this.pdfBlobUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
  }

  descargarPdf() {
    if (!this.file) {
      console.error('No hay archivo para descargar');
      return;
    }

    const blob = new Blob([this.file], { type: this.tipo || 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = this.nombreArchivo || 'documento.pdf';
    a.click();

    window.URL.revokeObjectURL(url);
  }

  descargarArchivo() {
    if (this.tipo == 'excel') {
      this.descargarExcel();
    }
    else {
      this.descargarPdf();
    }
  }

  cerrar() {
    this.closeModal.emit();
  }
}
