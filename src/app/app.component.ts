import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'neodigiprint';

  constructor(private translate: TranslateService, private config: PrimeNGConfig) {
    translate.setDefaultLang('es');
    translate.use('es');
    translate.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

}
