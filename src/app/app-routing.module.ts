import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './list/list.component';
import {RepoComponent} from './repo/repo.component';
import {ContributorComponent} from './contributor/contributor.component';

const routes: Routes = [
  {path: 'list', component: ListComponent},
  { path: 'repo/:name', component: RepoComponent },
  { path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
  { path: 'contributor/:name', component: ContributorComponent},
  { path: '**', redirectTo: '/list'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
