import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeCentralModule } from './primeng-central.module';
import { AngularMaterialModule } from './angular-material.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { DataViewerModalComponent } from './data-viewer-modal/data-viewer-modal.component';
import { DownloadOptionsComponent } from './downloadoptions/downloadoptions.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    DownloadOptionsComponent,
    DataViewerModalComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    PrimeCentralModule,
    AngularMaterialModule,
    NgSelectModule,
    CurrencyMaskModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    PrimeCentralModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    NgSelectModule,
    CurrencyMaskModule,
    DownloadOptionsComponent,
    DataViewerModalComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class SharedModule { }