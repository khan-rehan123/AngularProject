import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddupdatetestingComponent } from './addupdatetesting/addupdatetesting.component';
import { ViewtestingComponent } from './viewtesting/viewtesting.component';
import { ListtestingComponent } from './listtesting/listtesting.component';
const routes: Routes = [
  {
    path:'add',component:AddupdatetestingComponent
  },{
    path:'list',component :ListtestingComponent
  },
  {path:'update/:id',component :AddupdatetestingComponent},

  {
    path :'view/:id',component: ViewtestingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessContTestingRoutingModule { }
