import { BrowserModule } from '@angular/platform-browser';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
