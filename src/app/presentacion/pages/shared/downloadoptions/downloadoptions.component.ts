import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivationEnd, Router, Event, ActivatedRoute, NavigationEnd } from '@angular/router';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { DownloadExcelFileService } from '../../../../datos/local-servicios/download-excel-file.service';

@Component({
  selector: 'app-downlooadoptions',
  templateUrl: './downloadoptions.component.html'
})
export class DownloadOptionsComponent {

  @Input() datapdf: any;
  @Input() dataexcel: any[] = [];
  @Input() idImage: string | undefined;
  @Input() titledocument: string = "";
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter<boolean>();
  options: any[] = [];
  tipodescarga: string | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private downloadExcelFileService: DownloadExcelFileService) {

  }

  ngOnInit() {
    this.chargedata();
  }

  chargedata() {
    this.options = [];
    this.options.push({ tittle: 'Imagen', type: 'image' });
    this.options.push({ tittle: 'Excel', type: 'excel' });
    this.options.push({ tittle: 'Pdf', type: 'pdf' });
    this.options.push({ tittle: 'Imprimir', type: 'print' });
    this.tipodescarga = undefined;
  }

  closewindow() {
    this.cerrar.emit();
    this.chargedata();
  }

  selecttype() {
    switch (this.tipodescarga) {
      case 'image':
        this.descargarImagePdf();
        break;
      case 'excel':
        this.descargarExcel();
        break;
      case 'pdf':
        this.descargarPdf();
        break;
      case 'print':
        this.imprimriPdf()
        break;
      default:

        break;
    }
  }

  descargarExcel() {
    this.downloadExcelFileService.ExportToExcel(this.dataexcel as any, this.titledocument);
  }

  descargarPdf() {
    const doc = new jspdf();
    var header = this.datapdf[0];
    var extract = this.datapdf.shift();
    doc.setFontSize(16);
    doc.text(this.titledocument, 10, 10);
    autoTable(doc, {
      headStyles: { fillColor: '#dc3545' },
      head: [header],
      body: this.datapdf,
      startY: 30
    });
    doc.save(this.titledocument + '.pdf');
  }

  descargarImagePdf() {
    try {
      var filename: string = this.titledocument;
      let ele = document.getElementById('' + this.idImage)!
      let eleW = ele.offsetWidth;
      let eleH = ele.scrollHeight;
      let eleOffsetTop = ele.offsetTop;
      let eleOffsetLeft = ele.offsetLeft;
      var canvas = document.createElement("canvas")
      var abs = 0
      let win_in = document.documentElement.clientWidth || document.body.clientWidth
      let win_out = window.innerWidth
      if (win_out > win_in) {
        abs = (win_out - win_in) / 2
      }
      canvas.width = eleW * 2
      canvas.height = eleH * 2
      var context = canvas.getContext("2d")!
      context.scale(2, 2)
      context.translate(-eleOffsetLeft - abs, -eleOffsetTop)
      html2canvas(ele!, {
        scale: 2,
        useCORS: true
      }).then(canvas => {
        var contentWidth = canvas.width
        var contentHeight = canvas.height
        var pageHeight = (contentWidth / 841.89) * 585.28
        var leftHeight = contentHeight
        var position = 0
        var imgWidth = 841.89
        var imgHeight = (841.89 / contentWidth) * contentHeight
        var pageData = canvas.toDataURL("image/jpeg", 1.0)
        var pdf = new jspdf('landscape', 'pt', 'a4');
        if (leftHeight < pageHeight) {
          pdf.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight)
        } else { 
          while (leftHeight > 0) {
            pdf.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 580
            if (leftHeight > 0) {
              pdf.addPage()
            }
          }
        }
        pdf.save(filename + ".pdf");
      })
    } catch (error) {
      console.error('Error al capturar la pantalla:', error);
    }
  }

  async imprimriPdf() {
    try {
      const doc = new jspdf();
      doc.setFontSize(16);
      doc.text(this.titledocument, 10, 10);
      autoTable(doc, {
        //head: [this.headers],
        body: this.dataexcel,
        startY: 30
      });
      (await doc).autoPrint();
      const hiddFrame = document.createElement('iframe');
      hiddFrame.style.position = 'fixed';
      hiddFrame.style.width = '1px';
      hiddFrame.style.height = '1px';
      hiddFrame.style.opacity = '0.01';
      hiddFrame.src = (await doc).output('bloburl').toString();
      document.body.appendChild(hiddFrame);
    } catch (error) {
      console.error('Error al capturar la pantalla:', error);
    }
  }

}
