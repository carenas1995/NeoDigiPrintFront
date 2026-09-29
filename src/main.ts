import '@angular/compiler'; // <-- Agrégalo explícitamente en la línea 1 si persiste el error
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import 'zone.js';
import { environment } from './environments/environment.prod';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const app = initializeApp(environment.firebaseConfig);
if (typeof window !== 'undefined') {
  getAnalytics(app);
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));