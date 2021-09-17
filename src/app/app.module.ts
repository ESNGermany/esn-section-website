import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { EsncardPageComponent } from './pages/esncard-page/esncard-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { MembersPageComponent } from './pages/members-page/members-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ImprintPageComponent } from './pages/imprint-page/imprint-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { PretixCalendarComponent } from './components/pretix-calendar/pretix-calendar.component';
import { StatutesPageComponent } from './pages/statutes-page/statutes-page.component';
import { MarkdownModule } from 'ngx-markdown';
import { CocPageComponent } from './pages/coc-page/coc-page.component';
import { IncomingsPageComponent } from './pages/incomings-page/incomings-page.component';
import { ExpandableComponent } from './components/expandable/expandable.component';
import { MainService } from './services/main.service';
import { ContentService } from './services/content.service';
import { CocService } from './services/coc.service';
import { FaqService } from './services/faq.service';
import { ImprintService } from './services/imprint.service';
import { MessageService } from './services/message.service';
import { PartnerService } from './services/partner.service';
import { StatutesService } from './services/statutes.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    LandingPageComponent,
    EsncardPageComponent,
    EventsPageComponent,
    MembersPageComponent,
    TeamPageComponent,
    ImprintPageComponent,
    ErrorPageComponent,
    PretixCalendarComponent,
    StatutesPageComponent,
    CocPageComponent,
    IncomingsPageComponent,
    ExpandableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    MainService,
    ContentService,
    CocService,
    FaqService,
    ImprintService,
    MessageService,
    PartnerService,
    StatutesService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
