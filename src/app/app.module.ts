import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ContentItemComponent } from './components/content-item/content-item.component';
import { CustomCalendarComponent } from './components/custom-calendar/custom-calendar.component';
import { ExpandableComponent } from './components/expandable/expandable.component';
import { FooterComponent } from './components/footer/footer.component';
import { NationalPartnersComponent } from './components/national-partners/national-partners.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PretixCalendarComponent } from './components/pretix-calendar/pretix-calendar.component';
import { OlaContentItemComponent } from './components/ola-content-item/ola-content-item.component';

import { CocPageComponent } from './pages/coc-page/coc-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { EsncardPageComponent } from './pages/esncard-page/esncard-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { ImprintPageComponent } from './pages/imprint-page/imprint-page.component';
import { IncomingsPageComponent } from './pages/incomings-page/incomings-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MembersPageComponent } from './pages/members-page/members-page.component';
import { StatutesPageComponent } from './pages/statutes-page/statutes-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';

import { CookieService } from 'ngx-cookie-service';
import { GalleryModule } from 'ng-gallery';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

import { CocService } from './services/coc.service';
import { ContentService } from './services/content.service';
import { EventsService } from './services/events.service';
import { FaqService } from './services/faq.service';
import { ImprintService } from './services/imprint.service';
import { MainService } from './services/main.service';
import { MenuService } from './services/menus.service';
import { MessageService } from './services/message.service';
import { NationalPartnersService } from './services/national-partners.service';
import { PartnerService } from './services/partner.service';
import { StatutesService } from './services/statutes.service';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    ContentItemComponent,
    CustomCalendarComponent,
    ExpandableComponent,
    FooterComponent,
    NationalPartnersComponent,
    NavigationComponent,
    OlaContentItemComponent,
    PretixCalendarComponent,
    CocPageComponent,
    ErrorPageComponent,
    EsncardPageComponent,
    EventsPageComponent,
    ImprintPageComponent,
    IncomingsPageComponent,
    LandingPageComponent,
    MembersPageComponent,
    StatutesPageComponent,
    TeamPageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    GalleryModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    FullCalendarModule,
  ],
  providers: [
    FullCalendarModule,
    CocService,
    ContentService,
    EventsService,
    FaqService,
    ImprintService,
    MainService,
    MenuService,
    MessageService,
    NationalPartnersService,
    PartnerService,
    StatutesService,
    CookieService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
