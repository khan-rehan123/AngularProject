import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiaRoutingModule } from './bia-routing.module';
import { BiaListComponent, viewDialogClass } from './bia-list/bia-list.component';
import { BiaViewComponent } from './bia-view/bia-view.component';
import { BiaaddUpdateComponent } from './biaadd-update/biaadd-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { BialistforadminComponent, remarkDialogClassForBia } from './bialistforadmin/bialistforadmin.component';


@NgModule({
  declarations: [BiaListComponent, BiaViewComponent, BiaaddUpdateComponent,DeleteDialogComponent, BialistforadminComponent,viewDialogClass,remarkDialogClassForBia],
  imports: [
    CommonModule,
    BiaRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents:[
    DeleteDialogComponent,
    viewDialogClass,
    remarkDialogClassForBia
  ]
})
export class BiaModule { }
