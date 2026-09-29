import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PagesModule } from './presentacion/pages/pages.module';
import { AngularMaterialModule } from './presentacion/pages/shared/angular-material.module';
import { jwtInterceptor } from './datos/interceptor/jwt.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './presentacion/pages/login/login.component';
import { SharedModule } from './presentacion/pages/shared/shared.module';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PagesModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([jwtInterceptor])
    ),
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
