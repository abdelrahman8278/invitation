import { Routes } from '@angular/router';
import { InvitationPageComponent } from './pages/invitation-page/invitation-page.component';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: ':slug/messages',
    component: MessagesPageComponent,
  },
  {
    path: ':slug',
    component: InvitationPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'alex-sarah',
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
