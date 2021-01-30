import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { ResultsComponent } from './results/results.component';
import { PollingComponent } from './polling/polling.component'

const routes: Routes = [
  {path: '', component: LandingComponent}, 
  {path: 'create-poll', component: CreatePollComponent}, 
  {path: 'results', component: ResultsComponent}, 
  {path: 'polling', component: PollingComponent}, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
