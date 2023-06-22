import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './activity.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { ActivityCreationComponent } from './pages/activity-creation/activity-creation.component';

const routes: Routes = [
  { path: '', redirectTo: 'landingpage', pathMatch: 'full' },
  {
    path: '', component: ActivityComponent, children:[
      { path: 'landingpage', component: LandingpageComponent },
      { path: 'addActivity', component: ActivityCreationComponent }
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
