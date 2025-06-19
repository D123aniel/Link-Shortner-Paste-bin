import { Routes } from '@angular/router';
import { ShareComponent } from './share/share.component';
import { ListLinkComponent } from './list-link/list-link.component';

export const routes: Routes = [
  { path: '', component: ShareComponent },
  { path: 'list-link', component: ListLinkComponent },
];
