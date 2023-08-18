import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { FullCalendarModule } from '@fullcalendar/angular';

import { GalleryModule } from 'ng-gallery';
import { CookieService } from 'ngx-cookie-service';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { ContentService } from './app/services/content.service';
import { MainService } from './app/services/main.service';
import { MessageService } from './app/services/message.service';
import { CocService } from './app/pages/coc-page/coc.service';
import { PartnerService } from './app/pages/esncard-page/partner.service';
import { ImprintService } from './app/pages/imprint-page/imprint.service';
import { ImprintESNGermanyService } from './app/pages/imprint-page/imprint-esn-germany.service';
import { FaqService } from './app/pages/incomings-page/faq.service';
import { StatutesService } from './app/pages/statutes-page/statutes.service';
import { SharedModule } from './app/shared/shared.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(
        AppRoutingModule,
        FullCalendarModule,
        GalleryModule,
        MarkdownModule.forRoot(),
        SharedModule,
      ),
      CocService,
      ContentService,
      CookieService,
      FaqService,
      FullCalendarModule,
      ImprintESNGermanyService,
      ImprintService,
      MainService,
      MessageService,
      PartnerService,
      StatutesService,
      provideAnimations(),
      provideHttpClient(withInterceptorsFromDi()),
      provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000',
      }),
    ],
  }).catch((err) => console.error(err));
});
