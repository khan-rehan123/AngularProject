import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddupdateComponent } from './addupdate/addupdate.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [ {
  path : 'add',component :AddupdateComponent
},{
  path : 'update/:id',component :AddupdateComponent
},{
  path :'list',component : ListComponent
},{
  path :'view',component :ViewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentmanagementRoutingModule { }
