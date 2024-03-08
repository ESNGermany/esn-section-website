import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CocPageComponent } from './pages/coc-page/coc-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { SupportPageComponent } from './pages/support-page/support-page.component';
import { ImprintPageComponent } from './pages/imprint-page/imprint-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { StatutesPageComponent } from './pages/statutes-page/statutes-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { DonatePageComponent } from './pages/donate-page/donate-page.component';
import { MembersPageComponent } from './pages/members-page/members-page.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
  {
    path: 'support',
    component: SupportPageComponent,
  },
  {
    path: 'donate',
    component: DonatePageComponent,
  },
  {
    path: 'membership',
    component: MembersPageComponent,
  },
  {
    path: 'team',
    component: TeamPageComponent,
  },
  {
    path: 'legal-notice',
    component: ImprintPageComponent,
  },
  {
    path: 'imprint',
    redirectTo: '/legal-notice',
  },
  {
    path: 'statutes',
    component: StatutesPageComponent,
  },
  {
    path: 'coc',
    component: CocPageComponent,
  },
  {
    path: 'error',
    title: 'Oopsie - ESN Germany',
    component: ErrorPageComponent,
  },
  {
    path: '**',
    redirectTo: '/error',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
