import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent
      ),
  },
  {
    path: 'esncard',
    loadChildren: () =>
      import('./pages/esncard-page/esncard-page.component').then(
        (m) => m.EsncardPageComponent
      ),
  },
  {
    path: 'events',
    loadChildren: () =>
      import('./pages/events-page/events-page.component').then(
        (m) => m.EventsPageComponent
      ),
  },
  {
    path: 'for-members',
    loadChildren: () =>
      import('./pages/members-page/members-page.component').then(
        (m) => m.MembersPageComponent
      ),
  },
  {
    path: 'team',
    loadChildren: () =>
      import('./pages/team-page/team-page.component').then(
        (m) => m.TeamPageComponent
      ),
  },
  {
    path: 'for-incomings',
    loadChildren: () =>
      import('./pages/incomings-page/incomings-page.component').then(
        (m) => m.IncomingsPageComponent
      ),
  },
  {
    path: 'imprint',
    loadChildren: () =>
      import('./pages/imprint-page/imprint-page.component').then(
        (m) => m.ImprintPageComponent
      ),
  },
  {
    path: 'statutes',
    loadChildren: () =>
      import('./pages/statutes-page/statutes-page.component').then(
        (m) => m.StatutesPageComponent
      ),
  },
  {
    path: 'coc',
    loadChildren: () =>
      import('./pages/coc-page/coc-page.component').then(
        (m) => m.CocPageComponent
      ),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./pages/error-page/error-page.component').then(
        (m) => m.ErrorPageComponent
      ),
    data: {
      title: 'Oopsie - ESN Germany',
    },
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
