import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganisationRoutingModule } from './organisation-routing.module';
import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@NgModule({
  declarations: [ListComponent,UserDialogComponent],
  imports: [
    CommonModule,
    OrganisationRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule  
  ],
  entryComponents:[
    UserDialogComponent
  ]
})
export class OrganisationModule { }
