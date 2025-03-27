import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {preset} from '../assets/preset'

import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';
import { AuthInterceptor } from './helpers/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),  
        {
            provide:HTTP_INTERCEPTORS,
            useClass:AuthInterceptor,
            multi:true
        },
    provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: preset,
                options: {
                    darkModeSelector: false || 'none'
                }
            }
        }), provideHttpClient(), provideTransloco({
        config: { 
          availableLangs: ['en', 'ru'],
          defaultLang: 'ru',
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      })
  ]
};
