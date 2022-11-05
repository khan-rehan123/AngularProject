import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserlistComponent } from './userlist/userlist.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { UserDialogComponent } from './user-dialog/user-dialog.component';


@NgModule({
  declarations: [UserlistComponent,UserDialogComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
export class UsersModule { }
