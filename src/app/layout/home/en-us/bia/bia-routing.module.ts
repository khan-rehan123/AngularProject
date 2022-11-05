import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BiaViewComponent } from './bia-view/bia-view.component';
import { BiaaddUpdateComponent } from './biaadd-update/biaadd-update.component';
import { BiaListComponent } from './bia-list/bia-list.component';
import { BialistforadminComponent } from './bialistforadmin/bialistforadmin.component';

const routes: Routes = [
  {path:"list",component:BiaListComponent},
  {path:"adminlist",component:BialistforadminComponent},

  {path:'add',component :BiaaddUpdateComponent},
  {
    path :'update/:id',component:BiaaddUpdateComponent
  },
  {path:"view/:id",component:BiaViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiaRoutingModule { }
