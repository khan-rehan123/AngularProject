import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BcmAddupdateComponent } from './bcm-addupdate/bcm-addupdate.component';
import { BcmListComponent } from './bcm-list/bcm-list.component';
import { BcmViewComponent } from './bcm-view/bcm-view.component';
import { ProjectComponent } from './project/project.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { ProcessaddComponent } from './processadd/processadd.component';
import { ProcesslistComponent } from './processlist/processlist.component';
import { ProjectviewComponent } from './projectview/projectview.component';
import { ProcessviewComponent } from './processview/processview.component';
import { ApplicationlistComponent } from './applicationlist/applicationlist.component';
import { ApplicationaddComponent } from './applicationadd/applicationadd.component';
import { ViewapplicationComponent } from './viewapplication/viewapplication.component';
import { BCMAdminListComponent } from './bcmadmin-list/bcmadmin-list.component';

const routes: Routes = [

  {path:'programlist',component:BcmListComponent},
  {path:'programadd',component:BcmAddupdateComponent},
  {path:'programupdate/:id',component:BcmAddupdateComponent},
  {path:'programview/:id',component:BcmViewComponent},
  {path :'projectlist',component:ProjectlistComponent},
  {path : 'projectadd',component:ProjectComponent},
  {path : 'projectUpdate/:id',component :ProjectComponent},
  {path : 'projectview/:id',component : ProjectviewComponent},
  {path :'processlist',component:ProcesslistComponent},
  {path : 'processadd',component:ProcessaddComponent},
  {path : 'processUpdate/:id',component :ProcessaddComponent},
  {path : 'processview/:id',component : ProcessviewComponent},
  {path:'applicationlist',component:ApplicationlistComponent},
  {path:'addapplication',component:ApplicationaddComponent},
  {path:'updateapplication/:id',component:ApplicationaddComponent}, 
  {path:'viewapplication' ,component:ViewapplicationComponent},
  {path:'bcmlist' ,component:BCMAdminListComponent}
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BcmProgramRoutingModule { }
