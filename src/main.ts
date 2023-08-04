import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { SharedModule } from './app/shared/shared.module';
import { MarkdownModule } from 'ngx-markdown';
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GalleryModule } from 'ng-gallery';
import { bootstrapApplication } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { StatutesService } from './app/pages/statutes-page/statutes.service';
import { PartnerService } from './app/pages/esncard-page/partner.service';
import { NationalPartnerService } from './app/pages/esncard-page/national-partners.service';
import { MessageService } from './app/services/message.service';
import { MainService } from './app/services/main.service';
import { ImprintEsnGerService } from './app/pages/imprint-page/imprint-esnger.service';
import { ImprintService } from './app/pages/imprint-page/imprint.service';
import { FaqService } from './app/pages/incomings-page/faq.service';
import { ContentService } from './app/services/content.service';
import { CocService } from './app/pages/coc-page/coc.service';
import { FullCalendarModule } from '@fullcalendar/angular';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(
        GalleryModule,
        AppRoutingModule,
        MarkdownModule.forRoot(),
        FullCalendarModule,
        SharedModule,
      ),
      FullCalendarModule,
      CocService,
      ContentService,
      FaqService,
      ImprintService,
      ImprintEsnGerService,
      MainService,
      MessageService,
      NationalPartnerService,
      PartnerService,
      StatutesService,
      CookieService,
      provideAnimations(),
      provideHttpClient(withInterceptorsFromDi()),
    ],
  }).catch((err) => console.error(err));
});
