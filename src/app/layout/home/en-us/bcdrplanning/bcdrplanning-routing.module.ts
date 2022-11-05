import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BcdraddComponent } from './bcdradd/bcdradd.component';
import { BcdrlistComponent } from './bcdrlist/bcdrlist.component';
import { BcdrviewComponent } from './bcdrview/bcdrview.component';

const routes: Routes = [ {
  path:'add',component:BcdraddComponent
},{
  path:'list',component :BcdrlistComponent
},
{path:'update/:id',component :BcdraddComponent},

{
  path :'view/:id',component: BcdrviewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BcdrplanningRoutingModule { }
