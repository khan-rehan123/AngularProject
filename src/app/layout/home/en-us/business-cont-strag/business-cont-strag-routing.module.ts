import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessStratigieslistComponent } from './business-stratigieslist/business-stratigieslist.component';
import { BusinessStratigiesaddComponent } from './business-stratigiesadd/business-stratigiesadd.component';
import { BusinessStratigiesviewComponent } from './business-stratigiesview/business-stratigiesview.component';
import { StratigieslistfornonadminComponent } from './stratigieslistfornonadmin/stratigieslistfornonadmin.component';
const routes: Routes = [
  {
    path:'add',component:BusinessStratigiesaddComponent
  },{
    path:'adminlist',component :BusinessStratigieslistComponent
  },
  {path:'list',component:StratigieslistfornonadminComponent},
  {path:'update/:id',component :BusinessStratigiesaddComponent},

  {
    path :'view/:id',component: BusinessStratigiesviewComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessContStragRoutingModule { }
