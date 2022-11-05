import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentmanagementRoutingModule } from './incidentmanagement-routing.module';
import { AddupdateComponent } from './addupdate/addupdate.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';


@NgModule({
  declarations: [AddupdateComponent, ListComponent, ViewComponent],
  imports: [
    CommonModule,
    IncidentmanagementRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule  
  ]
})
export class IncidentmanagementModule { }
