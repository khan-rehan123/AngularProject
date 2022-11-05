import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentlistComponent } from './departmentlist/departmentlist.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentDialogComponent } from './department-dialog/department-dialog.component';
import { DeleteDepDialogComponent } from './delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [DepartmentlistComponent,DepartmentDialogComponent,DeleteDepDialogComponent],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents:[
    DepartmentDialogComponent,DeleteDepDialogComponent
  ]
})
export class DepartmentModule { }
