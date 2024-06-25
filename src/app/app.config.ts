import { ApplicationConfig } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { FlagBasedPreloadingStrategy } from './flag-based.preloading-strategy';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(FlagBasedPreloadingStrategy)),
    provideClientHydration(),
    provideHttpClient(withFetch())
  ]
};
